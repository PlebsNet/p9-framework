"use client";

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useSubscription } from '@apollo/client';
import gql from 'graphql-tag';
import { useAccount } from 'wagmi';

interface ForceGraph3DInstance {
  cameraPosition: (pos: { x?: number; y?: number; z?: number }) => void;
  camera: {
    position: { x: number; y: number; z: number };
  };
}

interface ForceGraph3DProps {
  ref?: React.RefCallback<ForceGraph3DInstance>;
  enableNodeDrag?: boolean;
  graphData: GraphData;
  width: number;
  height: number;
  nodeColor: () => string;
  nodeRelSize: number;
  nodeLabel: string;
  linkColor: () => string;
  linkWidth: number;
  backgroundColor: string;
  onEngineStop?: () => void;
  showNavInfo?: boolean;
}

// @ts-expect-error ssr
const ForceGraph3D = dynamic(() => import('react-force-graph').then(mod => mod.ForceGraph3D), {
  ssr: false
}) as React.ComponentType<ForceGraph3DProps>;

interface Node {
  id: string;
  label: string;
}

interface Link {
  source: string;
  target: string;
  label: string;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

interface Atom {
  label: string;
  __typename: string;
}

interface Claim {
  subject: Atom;
  predicate: Atom;
  object: Atom;
  __typename: string;
}

interface DynamicGraphProps {
  width: number;
  height: number;
}

const CLAIMS_SUBSCRIPTION = gql`
  subscription Subscription_root($where: claims_bool_exp) {
    claims(where: $where) {
      subject {
        label
        __typename
      }
      predicate {
        label
        __typename
      }
      object {
        label
        __typename
      }
      __typename
    }
  }
`;

export default function DynamicGraph({ width, height }: DynamicGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<ForceGraph3DInstance | null>(null);
  const { address } = useAccount();
  const [data, setData] = useState<GraphData>({ nodes: [], links: [] });
  const nodeMapRef = useRef<Map<string, Node>>(new Map());
  const [isGraphLoaded, setIsGraphLoaded] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const angleRef = useRef(0);
  const distanceRef = useRef(600);

  useEffect(() => {
    if (!fgRef.current) return;

    // Initialize camera position first
    fgRef.current.cameraPosition({ z: 600 });

    // camera orbit
    const intervalId = setInterval(() => {
      if (!fgRef.current || !isRotating || isHovering) return;
      angleRef.current += Math.PI / 1500;
      fgRef.current.cameraPosition({
        x: distanceRef.current * Math.sin(angleRef.current),
        z: distanceRef.current * Math.cos(angleRef.current)
      });
    }, 10);

    return () => clearInterval(intervalId);
  }, [isGraphLoaded, isRotating, isHovering]);

  const { data: subscriptionData, loading, error } = useSubscription(CLAIMS_SUBSCRIPTION, {
    variables: {
      where: {
        account_id: {
          _eq: address?.toLowerCase() || ''
        }
      }
    }
  });

  useEffect(() => {
    if (subscriptionData?.claims) {
      const claims = subscriptionData.claims as Claim[];

      // Reset the node map and data for a fresh start
      nodeMapRef.current.clear();
      const newNodes: Node[] = [];
      const newLinks: Link[] = [];

      // First pass: create all nodes (including predicates)
      claims.forEach(claim => {
        // Add subject node
        if (!nodeMapRef.current.has(claim.subject.label)) {
          const subjectNode = { id: claim.subject.label, label: claim.subject.label };
          newNodes.push(subjectNode);
          nodeMapRef.current.set(claim.subject.label, subjectNode);
        }

        // Add predicate node
        const predicateId = `predicate_${claim.predicate.label}`;
        if (!nodeMapRef.current.has(predicateId)) {
          const predicateNode = { id: predicateId, label: claim.predicate.label };
          newNodes.push(predicateNode);
          nodeMapRef.current.set(predicateId, predicateNode);
        }

        // Add object node
        if (!nodeMapRef.current.has(claim.object.label)) {
          const objectNode = { id: claim.object.label, label: claim.object.label };
          newNodes.push(objectNode);
          nodeMapRef.current.set(claim.object.label, objectNode);
        }
      });

      // Second pass: create links connecting through predicates
      claims.forEach(claim => {
        const predicateId = `predicate_${claim.predicate.label}`;

        // Link from subject to predicate
        newLinks.push({
          source: claim.subject.label,
          target: predicateId,
          label: ''
        });

        // Link from predicate to object
        newLinks.push({
          source: predicateId,
          target: claim.object.label,
          label: ''
        });
      });

      console.log('Final graph data:', {
        nodes: newNodes,
        links: newLinks,
        nodeCount: newNodes.length,
        linkCount: newLinks.length
      });

      setData({ nodes: newNodes, links: newLinks });
    }
  }, [subscriptionData]);

  if (loading) return <div>Loading subscription...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: '#000000'
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => setIsRotating(!isRotating)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: isRotating ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.3s ease',
          }}
        >
          <path
            d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
            fill={isRotating ? '#3b82f6' : '#5A5F66'}
          />
        </svg>
      </div>
      {data.nodes.length > 0 ? (
        <ForceGraph3D
          ref={(el: ForceGraph3DInstance | null) => {
            fgRef.current = el;
            if (el) setIsGraphLoaded(true);
          }}
          enableNodeDrag={false}
          graphData={data}
          width={width}
          height={height}
          nodeColor={() => '#7598F9'}
          nodeRelSize={6}
          nodeLabel="label"
          linkColor={() => '#fff'}
          linkWidth={5}
          backgroundColor="#08090A"
          onEngineStop={() => console.log('Engine stopped')}
          showNavInfo={false}
        />
      ) : (
        <div className="h-full w-full bg-gray-950 border-1 border-gray-800 text-md text-gray-50 flex flex-col items-center justify-center p-4">
            <p>No data available.</p>
            <p>Please, initiate the test to create nodes and links.</p>
        </div>
      )}
    </div>
  );
} 