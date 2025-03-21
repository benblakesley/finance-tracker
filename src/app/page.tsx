'use client';

import { useAppSelector } from "@/state/hooks";
import { Box } from "@mui/material";

export default function Home() 
{
    const {id} = useAppSelector(state => state.user);
    
    return (
      <Box>
          {id ?
          <Box>
            you are signed in as user {id}
          </Box> :
          <Box>
            You are not signed in
          </Box>}
      </Box>
    );
}
