import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Button from "@/components/Button";
import Input from "@/components/Input";
import * as Icons from "phosphor-react-native";
import { useAuth } from "@/contexts/authContext";

type Wallet = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
};

const Wallet = () => {
  const { user } = useAuth();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [showAddWallet, setShowAddWallet] = useState(false);
  const [newWalletName, setNewWalletName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const handleAddWallet = () => {
    if (!newWalletName || !targetAmount) return;

    const newWallet: Wallet = {
      id: Date.now().toString(),
      name: newWalletName,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0,
    };

    setWallets([...wallets, newWallet]);
    setShowAddWallet(false);
    setNewWalletName("");
    setTargetAmount("");
  };

  const handleUpdateAmount = (id: string, amount: string) => {
    setWallets(wallets.map(wallet => {
      if (wallet.id === id) {
        return {
          ...wallet,
          currentAmount: parseFloat(amount) || 0
        };
      }
      return wallet;
    }));
  };

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Typo size={24} fontWeight="800">My Wallets</Typo>
          <Button 
            style={styles.addButton}
            onPress={() => setShowAddWallet(true)}
          >
            <Icons.Plus size={24} color={colors.black} weight="bold" />
          </Button>
        </View>

        {showAddWallet && (
          <View style={styles.addWalletForm}>
            <Input
              placeholder="Wallet Name (e.g., New Car)"
              value={newWalletName}
              onChangeText={setNewWalletName}
              icon={<Icons.Wallet size={26} color={colors.neutral300} weight="fill" />}
            />
            <Input
              placeholder="Target Amount"
              value={targetAmount}
              onChangeText={setTargetAmount}
              keyboardType="numeric"
              icon={<Icons.CurrencyDollar size={26} color={colors.neutral300} weight="fill" />}
            />
            <View style={styles.buttonGroup}>
              <Button 
                style={[styles.formButton, { backgroundColor: colors.neutral700 }]}
                onPress={() => setShowAddWallet(false)}
              >
                <Typo color={colors.text}>Cancel</Typo>
              </Button>
              <Button 
                style={styles.formButton}
                onPress={handleAddWallet}
              >
                <Typo color={colors.black}>Create</Typo>
              </Button>
            </View>
          </View>
        )}

        <View style={styles.walletList}>
          {wallets.map((wallet) => (
            <View key={wallet.id} style={styles.walletCard}>
              <View style={styles.walletHeader}>
                <Typo size={18} fontWeight="700">{wallet.name}</Typo>
                <Typo size={14} color={colors.textLight}>
                  Target: ${wallet.targetAmount}
                </Typo>
              </View>
              
              <View style={styles.progressContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { width: `${(wallet.currentAmount / wallet.targetAmount) * 100}%` }
                  ]} 
                />
              </View>

              <View style={styles.amountContainer}>
                <Input
                  placeholder="Add amount"
                  keyboardType="numeric"
                  value={wallet.currentAmount.toString()}
                  onChangeText={(value) => handleUpdateAmount(wallet.id, value)}
                  icon={<Icons.Plus size={20} color={colors.neutral300} weight="fill" />}
                  containerStyle={styles.amountInput}
                />
                <Typo size={14} color={colors.textLight}>
                  ${wallet.currentAmount} saved
                </Typo>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: spacingY._20,
  },
  addButton: {
    width: verticalScale(40),
    height: verticalScale(40),
    borderRadius: verticalScale(20),
  },
  addWalletForm: {
    backgroundColor: colors.neutral800,
    padding: spacingX._20,
    borderRadius: 17,
    gap: spacingY._15,
    marginBottom: spacingY._20,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: spacingX._10,
  },
  formButton: {
    flex: 1,
    height: verticalScale(45),
  },
  walletList: {
    gap: spacingY._15,
  },
  walletCard: {
    backgroundColor: colors.neutral800,
    padding: spacingX._20,
    borderRadius: 17,
    gap: spacingY._15,
  },
  walletHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressContainer: {
    height: verticalScale(8),
    backgroundColor: colors.neutral700,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  amountInput: {
    flex: 0.7,
    height: verticalScale(45),
  },
});