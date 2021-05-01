import React, { useEffect, useState } from "react";
import Head from "next/head";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { DataGrid } from "@material-ui/data-grid";
import { useQuery } from "@apollo/client";
import { Divider } from "@material-ui/core";
import { QUERY_ME } from "@/operations/User";
import { Me } from "@/operations/types";

import { setUser as saveUserAsConfig } from "../lib/user";
import Link from "../components/Link";
import {
  getUser, logout, User
} from "../lib/user";
import { ConfigKey, getConfig } from "../lib/config";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      textAlign: "center", paddingTop: theme.spacing(4), paddingBottom: theme.spacing(4)
    },
    button: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    }
  })
);

export default function HomePage(): JSX.Element {
  const classes = useStyles({});

  const [remoteUrl, setRemoteUrl] = useState("https://snippet.qfstudio.net/graphql");
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const uri = getConfig(ConfigKey.SERVER_URL) as string;
    if (uri) {
      setRemoteUrl(uri);
    }
  }, []);

  useEffect(() => {
    const user = getUser() as User | null;
    if (user) {
      setUser(user);
    }
  }, []);

  const {
    loading: userLoading, error: userError, data: userData
  } = useQuery<Me>(QUERY_ME);

  if (userData) {
    if (!getUser() || getUser().userId !== userData.me.userId) {
      saveUserAsConfig(userData.me);
      setUser(userData.me);
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Snippet Flow</title>
      </Head>
      <div className={classes.root}>
        <Typography variant="h6" gutterBottom>
          开发人员工具
        </Typography>
        <Typography gutterBottom>
          远端地址：{remoteUrl}
        </Typography>
        { user && <Typography gutterBottom>
          缓存的凭证：({user.userId}) {user.username}
        </Typography>}
        {
          userLoading && <Typography gutterBottom>正在加载用户信息。</Typography>
        }
        {
          userData && <Typography gutterBottom>{JSON.stringify(userData)}</Typography>
        }
        {
          user ?
            <Button variant="outlined" onClick={logout}>退出登录</Button>
            :
            <Button variant="outlined"><Link href="/user/sign-in">登录</Link></Button>
        }
        <Button variant="outlined" className={classes.button}>
          <Link href="/settings">打开设置</Link>
        </Button>
      </div>
    </React.Fragment>
  );
}
