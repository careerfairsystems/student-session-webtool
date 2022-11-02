import { VStack, Text, Skeleton, SkeletonText } from "@chakra-ui/react";

interface StudentInfoItemProps {
  label: string;
  value: string;
  loading: boolean;
}

export default function StudentInfoItem({ label, value, loading }: StudentInfoItemProps) {
  return (
    
      <VStack align="strech" spacing="0" my="0.2rem">
          <Text fontWeight={700}><Skeleton isLoaded={!loading}>{label}</Skeleton></Text>
          <Text><Skeleton isLoaded={!loading}>{value}</Skeleton></Text>
      </VStack>
    
  )
}
