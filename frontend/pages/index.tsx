import type { NextPage } from "next";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MediaRenderer } from "@thirdweb-dev/react";
import FeatureCard from "../components/FeatureCard";
import Link from "next/link";
import Events from "../components/Events";
import CarouselHomePage from "../components/CarouselHomePage";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Container maxW={"1440px"} className="my-12">
      <Flex px={20} borderRadius={20} py={20} my={20}>
        <Flex flexDirection={"row"}>
          <Flex flexDirection={"column"} justifyContent={"center"} w={"60%"}>
            <Stack spacing={4}>
              <Heading fontSize={"xl"} color='grey' as='cite'>Hederawhisper presents</Heading>
              <Heading fontSize={"6xl"}>
                Send tokens with a secret <span>Gift 🎁</span>
              </Heading>
              <Text fontSize={"xl"}>
                <UnorderedList>
                  <ListItem>Select from a varied varities of Tokens </ListItem>
                  <ListItem>Write a message and code </ListItem>
                  <ListItem>Connect your wallet </ListItem>
                  <ListItem>Transfer the tokens </ListItem>
                </UnorderedList>
              </Text>
              <Flex gap={4}>
                <Link href={"/wrapgift"}>
                  <Button colorScheme='purple' variant='solid'>Wrap a special Gift</Button>
                </Link>

                <Button variant='solid'>
                  Claim a Gift
                </Button>
              </Flex>
            </Stack>
          </Flex>
          <Box marginLeft={"auto"} w={"40%"}>
            <MediaRenderer src="/pyramid.png" height="100%" width="100%" />
          </Box>
        </Flex>
      </Flex>

      <CarouselHomePage />

      <SimpleGrid columns={2} spacing={4} mt={4}>
        <Flex>
          <MediaRenderer src="/placeholder.png" height="100%" width="80%" />
        </Flex>
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Stack spacing={4}>
            <FeatureCard
              step={"01"}
              title={"Select a Token"}
              description={
                "Select from a list of verified tokens from the drop down to send to your friends and family."
              }
            />
            <FeatureCard
              step={"02"}
              title={"Who to Send To"}
              description={
                "Enter the wallet address of the person you want to send the token to. This is non-reversible so make sure you have the right address."
              }
            />
            <FeatureCard
              step={"03"}
              title={"Select the method"}
              description={"Simple , Timelock or Recurring"}
            />
            <FeatureCard
              step={"04"}
              title={"Write a Message"}
              description={
                "Write a secret msg to go along with your token transfer. A nicer way to send a message along with the gift to your friends and family."
              }
            />
            <FeatureCard
              step={"05"}
              title={"Input the Unique Claim Code"}
              description={
                "Write the unique claim code that will be used to claim by the recipient. This is non-reversible so make sure you input the right code."
              }
            />
          </Stack>
        </Flex>
      </SimpleGrid>
      <Events />
    </Container>
  );
};

export default Home;
