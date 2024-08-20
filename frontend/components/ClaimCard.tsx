import { Box, Card, Flex, Heading, Input, Text , Button } from "@chakra-ui/react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { HEDERA_WHISPER_CONTRACT_ADDRESS } from "../const/addresses";
import TokenSelection from "./TokenSelection";
import { useState } from "react";
import TokenBalance from "./TokenBalance";

import styles from "../styles/Home.module.css";
import abi from "../abi/abi";
import ClaimButton from "./ClaimButton";
import { decryptMessage } from '../utils/hcsUtils';

export default function TransferCard() {
    const address = useAddress();

    const {
        contract
    } = useContract(HEDERA_WHISPER_CONTRACT_ADDRESS, abi);

    const {
        data: verifiedTokens,
        isLoading: isVerifiedTokensLoading,
    } = useContractRead(contract, "getAllVerifiedTokens");


    console.log(verifiedTokens,"verifiedTokens", isVerifiedTokensLoading);
    const [formData, setFormData] = useState({
        receiver: '',
        amount: '',
        message: '',
        claimcode: ''
    });

    const [selectedToken, setSelectedToken] = useState('');

    const handleChange = (event: any, name: any) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: event.target.value
        }));
    };

    const handleTokenSelection = (tokenAddress: string) => {
        setSelectedToken(tokenAddress);
    };

    // dewcrypt message

    const [encryptedMessage, setEncryptedMessage] = useState('');
    const [decryptedMessage, setDecryptedMessage] = useState('');
    const [privateKey, setPrivateKey] = useState('');

    const handleDecrypt = async () => {
        try {
            const decrypted = await decryptMessage(encryptedMessage, privateKey);
            setDecryptedMessage(decrypted);
        } catch (error) {
            console.error('Failed to decrypt message:', error);
            setDecryptedMessage('Failed to decrypt message.');
        }
    };

    return (
        <Card w={"50%"} p={20}>
        <Heading>Claim your gift:</Heading>

        <Text mt={4} fontWeight={"bold"}>Select Token:</Text>
        <Flex flexDirection={"row"} mt={4}>
            {!isVerifiedTokensLoading && verifiedTokens && 
                verifiedTokens.map((token : string) => (
                    <Box
                        key={token}
                        onClick={() => handleTokenSelection(token)}
                        className={styles.tokenButton}
                    >
                        <TokenSelection
                            tokenAddress={token}
                            isSelected={selectedToken === token}
                        />
                    </Box>
                ))}
        </Flex>

        <TokenBalance tokenAddress={selectedToken} />

        <Text mt={4} fontWeight={"bold"}>Claim Code:</Text>
        <Input
            placeholder="Add a unique code here."
            type="text"
            value={formData.claimcode}
            onChange={(event) => handleChange(event, "claimcode")}
        />
        <Box mt={8}>
            <ClaimButton
                claimcode={formData.claimcode}
                tokenAddress={selectedToken}
            />
        </Box>

        <div className="my-6">
            <Input
                placeholder="Enter encrypted message"
                value={encryptedMessage}
                onChange={(e) => setEncryptedMessage(e.target.value)}
            />
            <Input
                placeholder="Enter your private key"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                mt={2}
            />
            <Button onClick={handleDecrypt} mt={4}>
                Decrypt Message
            </Button>
            {decryptedMessage && (
                <Text mt={4}>
                    Decrypted Message: {decryptedMessage}
                </Text>
            )}
        </div>
    </Card>
    );
};