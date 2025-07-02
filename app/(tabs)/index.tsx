import { StyleSheet, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from 'react-native';

interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
}

// Sample data for demonstration
const sampleTransactions: Transaction[] = [
  { id: '1', amount: 1500, type: 'income', category: 'Sales', description: 'Product sales', date: '2024-07-02' },
  { id: '2', amount: 200, type: 'expense', category: 'Supplies', description: 'Office supplies', date: '2024-07-02' },
  { id: '3', amount: 800, type: 'income', category: 'Sales', description: 'Service payment', date: '2024-07-01' },
  { id: '4', amount: 50, type: 'expense', category: 'Transport', description: 'Delivery costs', date: '2024-07-01' },
];

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);

  // Calculate financial summary
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const profit = totalIncome - totalExpenses;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 24,
      paddingTop: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.icon,
    },
    cardsContainer: {
      padding: 16,
      gap: 16,
    },
    card: {
      backgroundColor: colors.card,
      padding: 20,
      borderRadius: 16,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.icon,
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    amount: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    incomeAmount: {
      color: colors.success,
    },
    expenseAmount: {
      color: colors.error,
    },
    profitAmount: {
      color: profit >= 0 ? colors.success : colors.error,
    },
    changeText: {
      fontSize: 14,
      color: colors.icon,
    },
    recentSection: {
      padding: 16,
      paddingTop: 8,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
    },
    transactionItem: {
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 12,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    transactionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    transactionInfo: {
      flex: 1,
    },
    transactionDescription: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    transactionCategory: {
      fontSize: 14,
      color: colors.icon,
    },
    transactionAmount: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Finance Tracker</Text>
          <Text style={styles.subtitle}>Welcome back! Here's your financial overview</Text>
        </View>

        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Income</Text>
            <Text style={[styles.amount, styles.incomeAmount]}>${totalIncome.toLocaleString()}</Text>
            <Text style={styles.changeText}>This month</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Expenses</Text>
            <Text style={[styles.amount, styles.expenseAmount]}>${totalExpenses.toLocaleString()}</Text>
            <Text style={styles.changeText}>This month</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Net Profit</Text>
            <Text style={[styles.amount, styles.profitAmount]}>${profit.toLocaleString()}</Text>
            <Text style={styles.changeText}>
              {profit >= 0 ? 'Profitable' : 'Loss'} this month
            </Text>
          </View>
        </View>

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {transactions.slice(0, 5).map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionRow}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionDescription}>{transaction.description}</Text>
                  <Text style={styles.transactionCategory}>{transaction.category}</Text>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    transaction.type === 'income' ? styles.incomeAmount : styles.expenseAmount,
                  ]}
                >
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}