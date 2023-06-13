import React from "react";
import { Stack, Typography } from "@mui/material";

const SearchList = ({ result }: any) => {
  return (
    <div>
      <Stack>
        {result.length == 0 && (
          <Typography sx={{ ml: 1 }}>
            No result. Create a new one instead!
          </Typography>
        )}
        {result.map((todo: any) => (
          <Typography sx={{ ml: 1 }}>{todo.todo}</Typography>
        ))}
      </Stack>
    </div>
  );
};
export default SearchList;
