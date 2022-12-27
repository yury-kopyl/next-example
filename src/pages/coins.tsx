import Head from "next/head";
import Image from "next/image";
import React, {ReactElement} from "react";
import {Box, Container, Typography} from "@mui/material";
import {Masonry} from "@mui/lab";
import Paper from "#app/components/Paper";
import api from "#app/api";
import {NextPageWithLayout} from "#app/pages/_app";
import {PublicLayout} from "#app/layouts/publicLayout";
import {withServerSideProtected} from "#lib/serverSideProtected";


type Coins = {
  iconUrl: string;
  name: string;
  symbol: string;
  uuid: string;
}

const Coins: NextPageWithLayout<{ coins: Coins[] }> = ({coins}) => {
  return (
    <Container maxWidth="md">
      <Head>
        <title>Coins</title>

        <link
          href="/favicon.ico"
          rel="icon"
        />
      </Head>

      <Typography
        align="center"
        my={2}
        variant="h3"
      >
        Coins
      </Typography>

      <Masonry>
        {coins.map(coin => (
          <Paper
            key={coin.uuid}
            title={coin.name}
          >
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              p={2}
            >
              <Typography
                align="center"
                overflow="hidden"
                textOverflow="ellipsis"
                variant="h5"
                whiteSpace="nowrap"
                width="100%"
              >
                {coin.name}
              </Typography>

              <Box
                height={48}
                mt={2}
                position="relative"
                width={48}
              >
                <Image
                  alt={coin.symbol}
                  fill
                  src={coin.iconUrl}
                  style={{objectFit: "contain"}}
                />
              </Box>
            </Box>
          </Paper>
        ))}
      </Masonry>
    </Container>
  );
}

Coins.getLayout = function getLayout(page: ReactElement) {
  return (
    <PublicLayout user={page.props.user}>
      {page}
    </PublicLayout>
  );
}

export const getServerSideProps = withServerSideProtected(async ({req, res}) => {
  try {
    const {data} = await api.protected.getCoins();
    return {
      props: {
        coins: data.data.coins,
      }
    }
  } catch (e) {
    console.error(e);

    return {
      props: {
        coins: [],
      }
    }
  }
}, {redirectUrl: '/signin'});
export default Coins;
