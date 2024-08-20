import { Web3Button, useContract } from "@thirdweb-dev/react";
import { HEDERA_WHISPER_CONTRACT_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";
import { encryptMessage, submitEncryptedMessage } from "../utils/hcsUtils";
import abi from "../abi/abi";
import {
    Client,
    AccountId,
    PrivateKey,
    EvmAddress,
    PublicKey,
    TopicMessageSubmitTransaction,
} from '@hashgraph/sdk';

type Props = {
    tokenAddress: string;
    receiver: string;
    amount: string;
    message: string;
    claimcode: string;
};

export default function TransferButton({ tokenAddress, receiver, amount, message, claimcode }: Props) {
    const toast = useToast();
    const { contract: tokenContract } = useContract(tokenAddress, 'token');
    const { contract: transferContract } = useContract(HEDERA_WHISPER_CONTRACT_ADDRESS, abi);

    const handleTransfer = async () => {
        const publicKey = PublicKey.fromString(receiver);
        const encryptedMessage = await encryptMessage(message, publicKey);

        const sequenceNumber = await submitEncryptedMessage(process.env.NEXT_PUBLIC_HCS_TOPIC_ID, encryptedMessage, process.env.NEXT_PUBLIC_OPERATOR_ID, receiver);

        await tokenContract?.setAllowance(HEDERA_WHISPER_CONTRACT_ADDRESS, ethers.utils.parseEther(amount).toString());

        await transferContract?.call("createGiftWithClaimCode", [
            tokenAddress,
            receiver,
            ethers.utils.parseEther(amount),
            sequenceNumber ? sequenceNumber.toString() : "", // Use the sequence number instead of the plain message
            claimcode,
        ]);
    };

    return (
        <Web3Button
            contractAddress={HEDERA_WHISPER_CONTRACT_ADDRESS}
            action={handleTransfer}
            onSuccess={() => toast({
                title: 'Transfer Successful',
                description: "You have successfully transferred tokens!",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })}
        >
            Transfer Token
        </Web3Button>
    );
}
