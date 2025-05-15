import type { GetContractReturnType } from 'viem'

import { useContractWriteAndWait } from '@/hooks/useContractWriteAndWait'
import { useMultivaultContract } from '@/hooks/useMultivaultContract'

export const useDepositTriple = (contract: string) => {
    const multivault = useMultivaultContract(
        contract,
        84532
    ) as GetContractReturnType

    return useContractWriteAndWait({
        ...multivault,
        // @ts-expect-error TODO: Fix type for useContractWriteAndWait
        functionName: 'depositTriple',
    })
}