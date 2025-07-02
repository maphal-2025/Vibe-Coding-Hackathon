import { StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';
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

// Extended sample data for transactions
const sampleTransactions: Transaction[] = [
  { id: '1', amount: 1500, type: 'income', category: 'Sales', description: 'Product sales', date: '2024-07-02' },
  { id: '2', amount: 200, type: 'expense', category: 'Supplies', description: 'Office supplies', date: '2024-07-02' },
  { id: '3', amount: 800, type: 'income', category: 'Sales', description: 'Service payment', date: '2024-07-01' },
  { id: '4', amount: 50, type: 'expense', category: 'Transport', description: 'Delivery costs', date: '2024-07-01' },
  { id: '5', amount: 300, type: 'expense', category: 'Rent', description: 'Shop rent', date: '2024-06-30' },
  { id: '6', amount: 2000, type: 'income', category: 'Sales', description: 'Weekly sales', date: '2024-06-30' },
  { id: '7', amount: 120, type: 'expense', category: 'Utilities', description: 'Electricity bill', date: '2024-06-29' },
  { id: '8', amount: 450, type: 'income', category: 'Sales', description: 'Customer payment', date: '2024-06-29' },
];

export default function TransactionsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'income' | 'expense'>('all');

  // Filter transactions based on search and filter
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || transaction.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

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
      marginBottom: 20,
    },
    searchContainer: {
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 16,
    },
    searchInput: {
      fontSize: 16,
      color: colors.text,
    },
    filterContainer: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 16,
    },
    filterButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    filterButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    filterButtonTextActive: {
      color: 'white',
    },
    transactionsList: {
      padding: 16,
      paddingTop: 0,
    },
    transactionItem: {
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    transactionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    transactionInfo: {
      flex: 1,
      marginRight: 12,
    },
    transactionDescription: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    transactionMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    transactionCategory: {
      fontSize: 14,
      color: colors.icon,
    },
    transactionDate: {
      fontSize: 14,
      color: colors.icon,
    },
    transactionAmount: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'right',
    },
    incomeAmount: {
      color: colors.success,
    },
    expenseAmount: {
      color: colors.error,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    emptyText: {
      fontSize: 16,
      color: colors.icon,
      textAlign: 'center',
    },
    summary: {
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    summaryLabel: {
      fontSize: 14,
      color: colors.icon,
    },
    summaryAmount: {
      fontSize: 16,
      fontWeight: '600',
    },
  });

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionRow}>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionDescription}>{item.description}</Text>
          <View style={styles.transactionMeta}>
            <Text style={styles.transactionCategory}>{item.category}</Text>
            <Text style={styles.transactionDate}>• {new Date(item.date).toLocaleDateString()}</Text>
          </View>
        </View>
        <Text
          style={[
            styles.transactionAmount,
            item.type === 'income' ? styles.incomeAmount : styles.expenseAmount,
          ]}
        >
          {item.type === 'income' ? '+' : '-'}${item.amount.toLocaleString()}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <Text style={styles.subtitle}>Track all your income and expenses</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search transactions..."
            placeholderTextColor={colors.icon}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'all' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text style={[
              styles.filterButtonText,
              selectedFilter === 'all' && styles.filterButtonTextActive
            ]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'income' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('income')}
          >
            <Text style={[
              styles.filterButtonText,
              selectedFilter === 'income' && styles.filterButtonTextActive
            ]}>
              Income
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'expense' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('expense')}
          >
            <Text style={[
              styles.filterButtonText,
              selectedFilter === 'expense' && styles.filterButtonTextActive
            ]}>
              Expenses
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Income:</Text>
            <Text style={[styles.summaryAmount, styles.incomeAmount]}>
              ${totalIncome.toLocaleString()}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Expenses:</Text>
            <Text style={[styles.summaryAmount, styles.expenseAmount]}>
              ${totalExpenses.toLocaleString()}
            </Text>
          </View>
          <View style={[styles.summaryRow, { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 8, marginBottom: 0 }]}>
            <Text style={[styles.summaryLabel, { fontWeight: '600' }]}>Net:</Text>
            <Text style={[
              styles.summaryAmount,
              { fontSize: 18 },
              totalIncome - totalExpenses >= 0 ? styles.incomeAmount : styles.expenseAmount
            ]}>
              ${(totalIncome - totalExpenses).toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {filteredTransactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {searchQuery ? 'No transactions match your search.' : 'No transactions found.'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredTransactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.transactionsList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}