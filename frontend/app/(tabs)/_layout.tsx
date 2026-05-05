// app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import Svg, { Circle, Rect, Path } from "react-native-svg";

function DashboardIcon({ color, focused }: { color: string; focused: boolean }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <Circle cx={11} cy={11} r={7} fill="none" stroke={color} strokeWidth={focused ? 1.7 : 1.3} />
      <Circle cx={11} cy={11} r={1.7} fill={color} />
    </Svg>
  );
}

function ListIcon({ color, focused }: { color: string; focused: boolean }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <Rect x={4} y={4} width={14} height={14} fill="none" stroke={color} strokeWidth={focused ? 1.7 : 1.3} rx={1.5} />
      <Path d="M 7 10 L 15 10" stroke={color} strokeWidth={focused ? 1.5 : 1.1} strokeLinecap="round" />
      <Path d="M 7 13.5 L 12 13.5" stroke={color} strokeWidth={focused ? 1.5 : 1.1} strokeLinecap="round" />
    </Svg>
  );
}

function ProfileIcon({ color, focused }: { color: string; focused: boolean }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <Circle cx={11} cy={8} r={3.2} fill="none" stroke={color} strokeWidth={focused ? 1.7 : 1.3} />
      <Path d="M 4 18 Q 4 12.5 11 12.5 Q 18 12.5 18 18" fill="none" stroke={color} strokeWidth={focused ? 1.7 : 1.3} strokeLinecap="round" />
    </Svg>
  );
}

interface TabBarLabelProps {
  focused: boolean;
  color: string;
  children: string;
}

function TabBarLabel({ focused, color, children }: TabBarLabelProps) {
  return (
    <Text
      style={{
        fontSize: 10,
        color,
        fontFamily: focused ? "Inter_600SemiBold" : "Inter_500Medium",
        letterSpacing: 0.2,
        marginTop: 2,
      }}
    >
      {children}
    </Text>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3D5A47",
        tabBarInactiveTintColor: "#8A8278",
        tabBarStyle: {
          backgroundColor: "#FAF8F4",
          borderTopWidth: 0.5,
          borderTopColor: "rgba(235, 231, 223, 0.8)",
          height: 70,
          paddingTop: 8,
          paddingBottom: 12,
        },
        tabBarLabelStyle: {
          fontFamily: "Inter_500Medium",
          fontSize: 10,
          letterSpacing: 0.2,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Özet",
          tabBarIcon: ({ color, focused }) => <DashboardIcon color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Liste",
          tabBarIcon: ({ color, focused }) => <ListIcon color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, focused }) => <ProfileIcon color={color} focused={focused} />,
        }}
      />
    </Tabs>
  );
}
