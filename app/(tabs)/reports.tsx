import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { useState } from 'react';
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

// Sample data for reports
const sampleTransactions: Transaction[] = [
  { id: '1', amount: 1500, type: 'income', category: 'Sales', description: 'Product sales', date: '2024-07-02' },
  { id: '2', amount: 200, type: 'expense', category: 'Supplies', description: 'Office supplies', date: '2024-07-02' },
  { id: '3', amount: 800, type: 'income', category: 'Sales', description: 'Service payment', date: '2024-07-01' },
  { id: '4', amount: 50, type: 'expense', category: 'Transport', description: 'Delivery costs', date: '2024-07-01' },
  { id: '5', amount: 300, type: 'expense', category: 'Rent', description: 'Shop rent', date: '2024-06-30' },
  { id: '6', amount: 2000, type: 'income', category: 'Sales', description: 'Weekly sales', date: '2024-06-30' },
  { id: '7', amount: 120, type: 'expense', category: 'Utilities', description: 'Electricity bill', date: '2024-06-29' },
  { id: '8', amount: 450, type: 'income', category: 'Sales', description: 'Customer payment', date: '2024-06-29' },
  { id: '9', amount: 180, type: 'expense', category: 'Marketing', description: 'Social media ads', date: '2024-06-28' },
  { id: '10', amount: 600, type: 'income', category: 'Service', description: 'Consultation fee', date: '2024-06-28' },
];

type TimePeriod = 'week' | 'month' | 'quarter';

export default function ReportsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('month');
  const [transactions] = useState<Transaction[]>(sampleTransactions);

  // Calculate category breakdown for expenses
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const totalExpenses = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0);

  // Calculate income breakdown
  const incomeByCategory = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const totalIncome = Object.values(incomeByCategory).reduce((sum, amount) => sum + amount, 0);

  // Calculate trends (mock data for visualization)
  const trends = {
    week: { income: 2300, expenses: 250, change: '+15%' },
    month: { income: totalIncome, expenses: totalExpenses, change: '+8%' },
    quarter: { income: totalIncome * 3, expenses: totalExpenses * 3, change: '+12%' },
  };

  const currentTrend = trends[selectedPeriod];
  const profit = currentTrend.income - currentTrend.expenses;
  const profitMargin = ((profit / currentTrend.income) * 100).toFixed(1);

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
    periodSelector: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 4,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    periodButton: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    periodButtonActive: {
      backgroundColor: colors.primary,
    },
    periodButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    periodButtonTextActive: {
      color: 'white',
    },
    scrollContent: {
      padding: 16,
      paddingTop: 0,
    },
    card: {
      backgroundColor: colors.card,
      padding: 20,
      borderRadius: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    summaryGrid: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 16,
    },
    summaryItem: {
      flex: 1,
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
    },
    summaryLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.icon,
      textTransform: 'uppercase',
      marginBottom: 4,
    },
    summaryValue: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    summaryChange: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.success,
    },
    incomeValue: {
      color: colors.success,
    },
    expenseValue: {
      color: colors.error,
    },
    profitValue: {
      color: profit >= 0 ? colors.success : colors.error,
    },
    categoryItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    categoryInfo: {
      flex: 1,
    },
    categoryName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 2,
    },
    categoryPercentage: {
      fontSize: 12,
      color: colors.icon,
    },
    categoryAmount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    chartPlaceholder: {
      height: 120,
      backgroundColor: colors.background,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    chartText: {
      fontSize: 14,
      color: colors.icon,
      textAlign: 'center',
    },
    insightCard: {
      backgroundColor: colors.accent,
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
    },
    insightTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 8,
    },
    insightText: {
      fontSize: 14,
      color: 'white',
      lineHeight: 20,
    },
    exportButton: {
      backgroundColor: colors.primary,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 16,
    },
    exportButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
  });

  const handleExport = () => {
    // Mock export functionality
    alert('Report exported successfully! Check your downloads folder.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reports</Text>
        <Text style={styles.subtitle}>Financial insights and analytics</Text>

        <View style={styles.periodSelector}>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'week' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('week')}
          >
            <Text style={[
              styles.periodButtonText,
              selectedPeriod === 'week' && styles.periodButtonTextActive
            ]}>
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'month' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('month')}
          >
            <Text style={[
              styles.periodButtonText,
              selectedPeriod === 'month' && styles.periodButtonTextActive
            ]}>
              Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'quarter' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('quarter')}
          >
            <Text style={[
              styles.periodButtonText,
              selectedPeriod === 'quarter' && styles.periodButtonTextActive
            ]}>
              Quarter
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
        {/* Summary Cards */}
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Revenue</Text>
            <Text style={[styles.summaryValue, styles.incomeValue]}>
              R{currentTrend.income.toLocaleString()}
            </Text>
            <Text style={styles.summaryChange}>{currentTrend.change}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Expenses</Text>
            <Text style={[styles.summaryValue, styles.expenseValue]}>
              R{currentTrend.expenses.toLocaleString()}
            </Text>
            <Text style={styles.summaryChange}>-2%</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Profit</Text>
            <Text style={[styles.summaryValue, styles.profitValue]}>
              R{profit.toLocaleString()}
            </Text>
            <Text style={styles.summaryChange}>{profitMargin}%</Text>
          </View>
        </View>

        {/* Insights */}
        <View style={styles.insightCard}>
          <Text style={styles.insightTitle}>💡 Key Insight</Text>
          <Text style={styles.insightText}>
            Your profit margin this {selectedPeriod} is {profitMargin}%. 
            {profit > 0 
              ? ' Great job maintaining profitability! Consider reinvesting in growth areas.'
              : ' Focus on reducing expenses or increasing revenue to improve profitability.'}
          </Text>
        </View>

        {/* Revenue Breakdown */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Revenue Breakdown</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartText}>📊 Revenue Chart</Text>
            <Text style={styles.chartText}>Interactive chart would go here</Text>
          </View>
          {Object.entries(incomeByCategory).map(([category, amount]) => {
            const percentage = ((amount / totalIncome) * 100).toFixed(1);
            return (
              <View key={category} style={styles.categoryItem}>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category}</Text>
                  <Text style={styles.categoryPercentage}>{percentage}% of total revenue</Text>
                </View>
                <Text style={[styles.categoryAmount, styles.incomeValue]}>
                  R{amount.toLocaleString()}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Expense Breakdown */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Expense Breakdown</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartText}>📊 Expense Chart</Text>
            <Text style={styles.chartText}>Interactive chart would go here</Text>
          </View>
          {Object.entries(expensesByCategory).map(([category, amount]) => {
            const percentage = ((amount / totalExpenses) * 100).toFixed(1);
            return (
              <View key={category} style={styles.categoryItem}>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category}</Text>
                  <Text style={styles.categoryPercentage}>{percentage}% of total expenses</Text>
                </View>
                <Text style={[styles.categoryAmount, styles.expenseValue]}>
                  R{amount.toLocaleString()}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Performance Trends */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Performance Trends</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartText}>📈 Trend Chart</Text>
            <Text style={styles.chartText}>Revenue and expense trends over time</Text>
          </View>
        </View>

        {/* Export Button */}
        <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
          <Text style={styles.exportButtonText}>📄 Export Report</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}