import { StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
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

const categories = {
  income: ['Sales', 'Service', 'Investment', 'Other Income'],
  expense: ['Supplies', 'Rent', 'Transport', 'Utilities', 'Marketing', 'Other Expense']
};

export default function AddTransactionScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = () => {
    if (!amount || !description || !selectedCategory) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount: numAmount,
      type: transactionType,
      category: selectedCategory,
      description,
      date: new Date().toISOString().split('T')[0],
    };

    // Here you would typically save to storage or send to API
    Alert.alert('Success', 'Transaction added successfully!', [
      {
        text: 'OK',
        onPress: () => {
          setAmount('');
          setDescription('');
          setSelectedCategory('');
        }
      }
    ]);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // Here you would implement voice recording functionality
    if (!isRecording) {
      Alert.alert('Voice Recording', 'Voice recording started. Speak your transaction details.');
    } else {
      Alert.alert('Voice Recording', 'Voice recording stopped. Processing...');
      // Mock voice recognition result
      setTimeout(() => {
        setDescription('Office supplies purchase');
        setAmount('150');
        setSelectedCategory('Supplies');
      }, 2000);
    }
  };

  const handlePhotoScan = () => {
    Alert.alert('Receipt Scan', 'Camera opened. Take a photo of your receipt.', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Take Photo',
        onPress: () => {
          // Mock photo scan result
          setTimeout(() => {
            Alert.alert('Scan Complete', 'Receipt processed successfully!');
            setDescription('Restaurant meal');
            setAmount('45.50');
            setSelectedCategory('Other Expense');
          }, 1500);
        }
      }
    ]);
  };

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
      marginBottom: 24,
    },
    typeSelector: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 4,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    typeButton: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    typeButtonActive: {
      backgroundColor: colors.primary,
    },
    typeButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    typeButtonTextActive: {
      color: 'white',
    },
    formSection: {
      marginBottom: 24,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: colors.text,
    },
    amountInput: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingVertical: 20,
    },
    categoriesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    categoryButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    categoryButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    categoryButtonText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
    },
    categoryButtonTextActive: {
      color: 'white',
    },
    quickActions: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 24,
    },
    quickActionButton: {
      flex: 1,
      backgroundColor: colors.accent,
      paddingVertical: 16,
      paddingHorizontal: 12,
      borderRadius: 12,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
    },
    quickActionButtonRecording: {
      backgroundColor: colors.error,
    },
    quickActionText: {
      fontSize: 14,
      fontWeight: '600',
      color: 'white',
    },
    submitButton: {
      backgroundColor: colors.primary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 8,
    },
    submitButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    scrollContent: {
      padding: 16,
      paddingTop: 0,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add Transaction</Text>
        <Text style={styles.subtitle}>Record your income or expense</Text>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[styles.typeButton, transactionType === 'income' && styles.typeButtonActive]}
              onPress={() => {
                setTransactionType('income');
                setSelectedCategory('');
              }}
            >
              <Text style={[
                styles.typeButtonText,
                transactionType === 'income' && styles.typeButtonTextActive
              ]}>
                Income
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeButton, transactionType === 'expense' && styles.typeButtonActive]}
              onPress={() => {
                setTransactionType('expense');
                setSelectedCategory('');
              }}
            >
              <Text style={[
                styles.typeButtonText,
                transactionType === 'expense' && styles.typeButtonTextActive
              ]}>
                Expense
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Amount ($)</Text>
            <TextInput
              style={[styles.input, styles.amountInput]}
              placeholder="0.00"
              placeholderTextColor={colors.icon}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter transaction description"
              placeholderTextColor={colors.icon}
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoriesContainer}>
              {categories[transactionType].map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.categoryButtonActive
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={[
                    styles.categoryButtonText,
                    selectedCategory === category && styles.categoryButtonTextActive
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.quickActions}>
            <TouchableOpacity
              style={[
                styles.quickActionButton,
                isRecording && styles.quickActionButtonRecording
              ]}
              onPress={handleVoiceRecord}
            >
              <Text style={styles.quickActionText}>
                {isRecording ? '🎤 Recording...' : '🎤 Voice Input'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={handlePhotoScan}
            >
              <Text style={styles.quickActionText}>📷 Scan Receipt</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Add Transaction</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}