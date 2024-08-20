import { useState } from "react";
import { Container, Card, Heading, Text, Input, Box, Flex } from "@chakra-ui/react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { HEDERA_WHISPER_CONTRACT_ADDRESS } from "../const/addresses";
import TokenSelection from "../components/TokenSelection";
import TokenBalance from "../components/TokenBalance";
import RecurringGiftButton from "../components/RecurringGiftButton";
import abi from "../abi/abi";

export default function RecurringGiftsPage() {
    const address = useAddress();
    const { contract } = useContract(HEDERA_WHISPER_CONTRACT_ADDRESS, abi);

    const { data: verifiedTokens, isLoading: isVerifiedTokensLoading } = useContractRead(contract, "getAllVerifiedTokens");

    const [formData, setFormData] = useState({
        receiver: '',
        amount: '',
        interval: '',
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

    return (
        <Container maxW={"1440px"}>
            <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                <Card w={"50%"} p={20}>
                    <Heading>Setup Recurring Gift:</Heading>

                    <Text mt={4} fontWeight={"bold"}>Select Token:</Text>
                    <Flex flexDirection={"row"} mt={4}>
                        {!isVerifiedTokensLoading && verifiedTokens && 
                            verifiedTokens.map((token: string) => (
                                <Box
                                    key={token}
                                    onClick={() => handleTokenSelection(token)}
                                    className="tokenButton"
                                >
                                    <TokenSelection
                                        tokenAddress={token}
                                        isSelected={selectedToken === token}
                                    />
                                </Box>
                            ))}
                    </Flex>

                    <TokenBalance tokenAddress={selectedToken} />

                    <Text mt={4} fontWeight={"bold"}>Send To:</Text>
                    <Input
                        placeholder="0x0000000"
                        type="text"
                        value={formData.receiver}
                        onChange={(event) => handleChange(event, "receiver")}
                    />

                    <Text mt={4} fontWeight={"bold"}>Amount:</Text>
                    <Input
                        placeholder="0.0"
                        type="number"
                        value={formData.amount}
                        onChange={(event) => handleChange(event, "amount")}
                    />

                    <Text mt={4} fontWeight={"bold"}>Interval (in seconds):</Text>
                    <Input
                        placeholder="3600"
                        type="number"
                        value={formData.interval}
                        onChange={(event) => handleChange(event, "interval")}
                    />

                    <Box mt={8}>
                        {address ? (
                            <RecurringGiftButton
                                tokenAddress={selectedToken}
                                receiver={formData.receiver}
                                amount={formData.amount.toString()}
                                interval={formData.interval.toString()}
                            />
                        ) : (
                            <Text>Please connect your wallet to set up a recurring gift.</Text>
                        )}
                    </Box>
                </Card>
            </Flex>
        </Container>
    );
}
