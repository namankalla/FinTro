import { StyleSheet, View, Alert, ScrollView, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { signOut } from "firebase/auth";
import { auth, firestore } from "@/config/firebase";
import { useAuth } from "@/contexts/authContext";
import ScreenWrapper from "@/components/ScreenWrapper";
import Input from "@/components/Input";
import * as SMS from 'expo-sms';
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import * as Icons from "phosphor-react-native";
import { verticalScale } from "@/utils/styling";

interface Transaction {
  amount: number;
  type: 'credit' | 'debit';
  date: Date;
  description: string;
}

const Home = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [newBalance, setNewBalance] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user?.uid) return;
    
    try {
      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setBalance(data.balance || 0);
        setTransactions(data.transactions || []);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const updateBalance = async () => {
    if (!user?.uid) return;
    
    try {
      setLoading(true);
      const newBalanceNum = parseFloat(newBalance);
      
      if (isNaN(newBalanceNum)) {
        Alert.alert("Invalid Amount", "Please enter a valid number");
        return;
      }

      await updateDoc(doc(firestore, "users", user.uid), {
        balance: newBalanceNum,
      });

      setBalance(newBalanceNum);
      setNewBalance("");
    } catch (error) {
      Alert.alert("Error", "Failed to update balance");
    } finally {
      setLoading(false);
    }
  };

  const readSMS = async () => {
    if (Platform.OS === 'web') {
      Alert.alert("Not Available", "SMS reading is not available on web platform");
      return;
    }

    try {
      const { status } = await SMS.isAvailableAsync();
      if (!status) {
        Alert.alert("Error", "SMS is not available on this device");
        return;
      }

      // Note: This is a mock implementation since actual SMS reading requires native modules
      // In a real implementation, you would use a native SMS reading module
      Alert.alert(
        "SMS Reading",
        "In a real implementation, this would read your bank SMS messages and update the balance automatically."
      );
    } catch (error) {
      Alert.alert("Error", "Failed to read SMS");
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Typo size={24} fontWeight="800">Welcome, {user?.name}</Typo>
        </View>

        <View style={styles.balanceCard}>
          <Typo size={16} color={colors.textLight}>Current Balance</Typo>
          <Typo size={36} fontWeight="800" color={colors.primary}>
            ${balance.toFixed(2)}
          </Typo>
        </View>

        <View style={styles.inputSection}>
          <Input
            placeholder="Enter new balance"
            value={newBalance}
            onChangeText={setNewBalance}
            keyboardType="numeric"
            icon={<Icons.CurrencyDollar size={26} color={colors.neutral300} weight="fill" />}
          />
          <Button onPress={updateBalance} loading={loading} style={styles.updateButton}>
            <Typo color={colors.black}>Update Balance</Typo>
          </Button>
        </View>

        {Platform.OS !== 'web' && (
          <Button 
            onPress={readSMS} 
            style={[styles.smsButton, { backgroundColor: colors.neutral800 }]}
          >
            <View style={styles.buttonContent}>
              <Icons.EnvelopeSimple size={24} color={colors.primary} />
              <Typo color={colors.text}>Sync Bank SMS</Typo>
            </View>
          </Button>
        )}

        <View style={styles.transactionsList}>
          <Typo size={20} fontWeight="700" style={styles.sectionTitle}>
            Recent Transactions
          </Typo>
          {transactions.map((transaction, index) => (
            <View key={index} style={styles.transactionItem}>
              <View>
                <Typo size={16} fontWeight="600">{transaction.description}</Typo>
                <Typo size={14} color={colors.textLight}>
                  {new Date(transaction.date).toLocaleDateString()}
                </Typo>
              </View>
              <Typo
                size={16}
                color={transaction.type === 'credit' ? colors.primary : colors.rose}
              >
                {transaction.type === 'credit' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
              </Typo>
            </View>
          ))}
        </View>

        <Button onPress={handleLogout} style={styles.logoutButton}>
          <Typo color={colors.black}>Logout</Typo>
        </Button>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  header: {
    marginVertical: spacingY._20,
  },
  balanceCard: {
    backgroundColor: colors.neutral800,
    padding: spacingX._20,
    borderRadius: 17,
    marginBottom: spacingY._20,
  },
  inputSection: {
    gap: spacingY._10,
    marginBottom: spacingY._20,
  },
  updateButton: {
    height: verticalScale(45),
  },
  smsButton: {
    height: verticalScale(45),
    marginBottom: spacingY._20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._10,
  },
  transactionsList: {
    gap: spacingY._10,
  },
  sectionTitle: {
    marginBottom: spacingY._10,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.neutral800,
    padding: spacingX._15,
    borderRadius: 12,
  },
  logoutButton: {
    marginVertical: spacingY._20,
  },
});