import { Tabs } from 'expo-router';
import * as Icons from 'phosphor-react-native';
import { colors } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.neutral800,
          borderTopColor: colors.neutral700,
          borderTopWidth: 1,
          height: verticalScale(55),
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Icons.House
              size={verticalScale(30)}
              weight={focused ? "fill" : "regular"}
              color={focused ? colors.primary : colors.neutral400}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistics',
          tabBarIcon: ({ focused }) => (
            <Icons.ChartBar
              size={verticalScale(30)}
              weight={focused ? "fill" : "regular"}
              color={focused ? colors.primary : colors.neutral400}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ focused }) => (
            <Icons.Wallet
              size={verticalScale(30)}
              weight={focused ? "fill" : "regular"}
              color={focused ? colors.primary : colors.neutral400}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Icons.User
              size={verticalScale(30)}
              weight={focused ? "fill" : "regular"}
              color={focused ? colors.primary : colors.neutral400}
            />
          ),
        }}
      />
    </Tabs>
  );
}