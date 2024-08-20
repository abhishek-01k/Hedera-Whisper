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
                Send tokens with a secret wrapped inside a <span>Gift 🎁</span>
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

      <Events />
    </Container>
  );
};

export default Home;
