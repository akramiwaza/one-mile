import React, { useEffect, useState } from "react";
import { Box, CardContent, Grid, Typography } from "@mui/material";
import TopPerformers from "src/components/dashboards/modern/TopPerformers";
import { useDispatch } from "react-redux";
import {
  columntype,
  dataLocalStorage,
  getLocalStorage,
  isValidArray,
} from "src/helper/publicFunction";
import { GetDataApi, GetTotalUserApi, viewed_key } from "./action";
import { RouterName } from "src/routes/RouterName";
import icon2 from "../../assets/images/svgs/icon-user-male.svg";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [loadingFlashCardsViewed, setloadingFlashCardsViewed] = useState(true);
  const [loadingflashcardsUsed, setloadingflashcardsUsed] = useState(true);
  const [loadingcategories, setloadingcategories] = useState(true);
  const [loadingactivities, setloadingactivities] = useState(true);
  const [numberUser, setnumberUser] = useState();
  const dispatch = useDispatch();
  let dataPrivileges = getLocalStorage(dataLocalStorage.privileges);

  const GetTotalUser = () => {
    dispatch(
      GetTotalUserApi({
        callback: (data) => {
          if (data) {
            if (data.data) {
              setnumberUser(data.data.totalUser);
            }
          }
        },
      })
    );
  };

  useEffect(() => {
    GetTotalUser();
  }, []);

  const columns = [
    { type: columntype.image, name: "media_link" },
    { type: columntype.text, name: "title_en" },
    { type: columntype.text, name: "views_count" },
  ];
  const headCells = [
    {
      id: "media_link",
      numeric: false,
      disablePadding: false,
      label: "Image",
      withSort: false,
    },
    {
      id: "title_en",
      numeric: false,
      disablePadding: false,
      label: "Name",
      withSort: false,
    },
    {
      id: "views_count",
      numeric: false,
      disablePadding: false,
      label: "Views count",
      withSort: false,
    },
  ];
  const GetDataflashcardsViewed = ({
    from = new Date(),
    to = new Date(),
    callback,
  }) => {
    setloadingFlashCardsViewed(true);
    dispatch(
      GetDataApi({
        from,
        to,
        type: viewed_key.flash_card_viewed,
        callback: (data) => {
          if (isValidArray(data?.data)) {
            callback(data?.data);
          } else {
            callback([]);
          }
          setloadingFlashCardsViewed(false);
        },
      })
    );
  };
  const GetDataflashcardsUsed = ({
    from = new Date(),
    to = new Date(),
    callback,
  }) => {
    setloadingflashcardsUsed(true);
    dispatch(
      GetDataApi({
        from,
        to,
        type: viewed_key.flash_card_used,
        callback: (data) => {
          if (isValidArray(data?.data)) {
            callback(data?.data);
          } else {
            callback([]);
          }
          setloadingflashcardsUsed(false);
        },
      })
    );
  };
  const GetDatacategories = ({
    from = new Date(),
    to = new Date(),
    callback,
  }) => {
    setloadingcategories(true);
    dispatch(
      GetDataApi({
        from,
        to,
        type: viewed_key.activity_category,
        callback: (data) => {
          if (isValidArray(data?.data)) {
            callback(data?.data);
          } else {
            callback([]);
          }
          setloadingcategories(false);
        },
      })
    );
  };
  const GetDataactivities = ({
    from = new Date(),
    to = new Date(),
    callback,
  }) => {
    setloadingactivities(true);
    dispatch(
      GetDataApi({
        from,
        to,
        type: viewed_key.activity,
        callback: (data) => {
          if (isValidArray(data?.data)) {
            callback(data?.data);
          } else {
            callback([]);
          }
          setloadingactivities(false);
        },
      })
    );
  };

  return (
    <Box>
      <Grid>
        <Grid item xs={12} lg={8}>
          <Link
            to={
              dataPrivileges["2"]?.access_read == 1
                ? RouterName.users.users
                : null
            }
          >
            <Box bgcolor={"primary.light"} textAlign="center">
              <CardContent>
                <img src={icon2} alt={icon2} width="50" />
                <Typography
                  color={"primary.main"}
                  mt={1}
                  variant="subtitle1"
                  fontWeight={600}
                >
                  Active Users
                </Typography>
                <Typography
                  color={"primary.main"}
                  variant="h4"
                  fontWeight={600}
                >
                  {numberUser}
                </Typography>
              </CardContent>
            </Box>
          </Link>
        </Grid>

        <br />
        <Grid item xs={12} lg={8}>
          <TopPerformers
            title={"top 10 viewed categories"}
            loading={loadingcategories}
            getData={GetDatacategories}
            columns={columns}
            headCells={headCells}
          />
        </Grid>
        <br />
        <Grid item xs={12} lg={8}>
          <TopPerformers
            title={"top 10 viewed activities"}
            loading={loadingactivities}
            getData={GetDataactivities}
            columns={columns}
            headCells={headCells}
          />
        </Grid>
        <br />
        <Grid item xs={12} lg={8}>
          <TopPerformers
            title={"top 10 viewed flash cards"}
            loading={loadingFlashCardsViewed}
            getData={GetDataflashcardsViewed}
            columns={columns}
            headCells={headCells}
          />
        </Grid>
        <br />
        <Grid item xs={12} lg={8}>
          <TopPerformers
            title={"top 10 flash cards used"}
            loading={loadingflashcardsUsed}
            getData={GetDataflashcardsUsed}
            columns={columns}
            headCells={headCells}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
