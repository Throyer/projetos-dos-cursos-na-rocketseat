import React, { FC } from "react";
import { Button, View } from "react-native";
import { useSession } from "../../hooks/session";

const Dashboard: FC = () => {
  const { signOut } = useSession();

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Button title="Sair" color="#ff9000" onPress={signOut} />
    </View>
  );
};

export default Dashboard;
