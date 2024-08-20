import { Button, Toast, useToast } from "@chakra-ui/react";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { HEDERA_WHISPER_CONTRACT_ADDRESS } from "../const/addresses";
import abi from "../abi/abi";

export default function RecurringGiftButton({ tokenAddress , receiver, amount, interval } : { tokenAddress: string, receiver: string, amount: string, interval: string }) {
    const { contract } = useContract(HEDERA_WHISPER_CONTRACT_ADDRESS, abi);
    const { mutateAsync: setupRecurringGift, isLoading } = useContractWrite(contract, "setupRecurringGift");

    const toast = useToast();

    const handleSetupRecurringGift = async () => {
        try {
            await setupRecurringGift({
                args: [tokenAddress, receiver, amount, interval],
            });

            toast({
                title: "Recurring Gift Setup",
                description: "Recurring gift has been setup.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            
        } catch (error) {
            console.error("Failed to setup recurring gift:", error);
            alert("Error setting up recurring gift.");
        }
    };

    return (
        <Button onClick={handleSetupRecurringGift} isLoading={isLoading}>
            Setup Recurring Gift
        </Button>
    );
}
