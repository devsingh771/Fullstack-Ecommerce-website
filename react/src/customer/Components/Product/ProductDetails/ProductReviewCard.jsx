import React from "react";
import { Avatar } from "@mui/material";
import { Rating, Box, Typography, Grid } from "@mui/material";

const ProductReviewCard = ({item}) => {
  const [value, setValue] = React.useState(4.5);
  return (
    <div className="">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2} md={1}>
          <Box className="flex justify-start sm:justify-center">
            <Avatar
              className="text-white"
              sx={{ width: 48, height: 48, bgcolor: "#9155FD" }}
              alt={item?.user?.firstName || "User"}
              src=""
            >
              {item?.user?.firstName?.[0]?.toUpperCase() || "U"}
            </Avatar>
          </Box>
        </Grid>
        <Grid item xs={12} sm={10} md={11}>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">{item?.user?.firstName || "Anonymous"}</p>
              <p className="opacity-70 text-xs">April 5, 2023</p>
            </div>
            <div>
              <Rating
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                name="half-rating"
                defaultValue={2.5}
                precision={0.5}
              />
            </div>
            <p className="text-gray-700 text-sm">
              {item?.review}
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;
