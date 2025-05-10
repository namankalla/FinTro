// components/Icons.jsx
import { House, ChartBar, Wallet, User } from "phosphor-react-native";

// These are just wrappers that pass props through (no hooks, no logic)
export const HouseIcon = (props) => <House {...props} />;
export const ChartBarIcon = (props) => <ChartBar {...props} />;
export const WalletIcon = (props) => <Wallet {...props} />;
export const UserIcon = (props) => <User {...props} />;

// Optional default export if you want to import all at once
export default {
  House: HouseIcon,
  ChartBar: ChartBarIcon,
  Wallet: WalletIcon,
  User: UserIcon,
};
