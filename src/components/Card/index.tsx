import React from 'react';
import { VStack, Box, Divider } from 'native-base';

function Card() {
  return (
    <Box borderX="1" borderRadius="md">
      <VStack space="4" divider={<Divider />}>
        <Box px="4" pt="4">
          CARD TITLE
        </Box>
        <Box px="4">
        Card Info
        </Box>
      </VStack>
    </Box>
  );
}

export default Card;