'use client';

import { useAppSelector } from "@/state/hooks";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingPage } from "./loading/LoadingPage";
import { TopBar } from "./top-bar/TopBar";

export default function Home() 
{
    const {id} = useAppSelector(state => state.user);
    const router = useRouter();

    useEffect(() => {

      if(!id)
      {
        router.push("/signin")
      }

    }, [id]);

    return (
      <Box>
          {id ?
          <Box>
            <TopBar/>
            you are signed in as user {id}
          </Box> :
          <Box>
            <LoadingPage/>
          </Box>}
      </Box>
    );
}
