import React, { FC } from "react";
import { ActivityIndicator, View } from "react-native";

import { useSession } from "../hooks/session";

import AuthRoutes from "./session.routes";
import AppRoutes from "./app.routes";

const Routes: FC = () => {
  const { user, loading } = useSession();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
