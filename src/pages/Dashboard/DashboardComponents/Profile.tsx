import {
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Spinner,
  Skeleton,
  Divider,
  Box,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

interface ProfileProps {
  userData: any;
  loading: boolean;
}

export default function Profile({ userData, loading }: ProfileProps) {
  return (
    <Stack direction={{ base: "column", md: "row" }}>
      <Flex flex={1} p={4} ml={5}>
        {loading ? (
          <Skeleton>
            <Stack direction="row" h="400px" w="400px" p={4}>
              <Divider orientation="vertical" />
            </Stack>
          </Skeleton>
        ) : (
          <Stack direction="row" h="400px" w="400px" p={4}>
            <Image
              alt={"profile"}
              fit={"cover"}
              w={"100%"}
              src={userData ? userData.profile_image : ""}
            />
          </Stack>
        )}
      </Flex>
      <Flex p={8} flex={3} align={"center"} justify={"left"}>
        {loading ? (
          <Stack spacing={2} w={"full"} maxW={"lg"}>
          <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='5' />
          </Stack>
        ) : (
          <Stack spacing={2} w={"full"} maxW={"lg"}>
            <Heading as="h3" size="lg">
              {userData ? userData.displayName : "indisponible"}
            </Heading>
            <Heading as="h5" size="sm">
              {userData ? userData.email : "indisponible"}
            </Heading>
            <Heading as="h5" size="sm">
              {userData ? userData.phone_number : "indisponible"}
            </Heading>
            <Heading as="h5" size="sm">
              {userData ? userData.address : "indisponible"}
            </Heading>
            <Heading as="h5" size="sm">
              {userData
                ? userData.bloodGroup
                : "indisponible"}
            </Heading>
            <Heading as="h5" size="sm">
              {userData
                ? userData.date_of_birth
                : "indisponible"}
            </Heading>
            <Text fontSize={{ base: "md", lg: "md" }} color={"gray.500"}>
              {userData ? userData.description : "indisponible"}
            </Text>
          </Stack>
        )}
      </Flex>
    </Stack>
  );
}
