import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  CreditCard,
  Download,
  Filter
} from 'lucide-react-native';

export default function RunnerEarningsScreen() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const earningsData = {
    total: 25680.50,
    thisWeek: 1850.75,
    pending: 340.25,
    available: 25340.25
  };

  const recentEarnings = [
    { id: '1', date: '2024-01-20', amount: 275, description: 'Grocery Shopping + Tip', status: 'paid' },
    { id: '2', date: '2024-01-20', amount: 150, description: 'Bill Payment', status: 'paid' },
    { id: '3', date: '2024-01-19', amount: 320, description: 'Package Delivery', status: 'pending' },
    { id: '4', date: '2024-01-19', amount: 180, description: 'Document Pickup', status: 'paid' },
    { id: '5', date: '2024-01-18', amount: 225, description: 'Medicine Purchase', status: 'paid' }
  ];

  const periods = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'year', label: 'This Year' }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#10B981', '#059669']} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Earnings</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.totalEarningsCard}>
          <View style={styles.totalEarningsHeader}>
            <Text style={styles.totalEarningsLabel}>Total Earnings</Text>
            <TrendingUp size={20} color="#10B981" strokeWidth={2} />
          </View>
          <Text style={styles.totalEarningsAmount}>₱{earningsData.total.toLocaleString()}</Text>
          <Text style={styles.totalEarningsSubtext}>+12% from last month</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodButton,
                selectedPeriod === period.id && styles.activePeriodButton
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period.id && styles.activePeriodButtonText
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.summaryCards}>
          <View style={styles.summaryCard}>
            <DollarSign size={24} color="#3B82F6" strokeWidth={2} />
            <Text style={styles.summaryValue}>₱{earningsData.thisWeek.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>This Week</Text>
          </View>
          <View style={styles.summaryCard}>
            <Calendar size={24} color="#F59E0B" strokeWidth={2} />
            <Text style={styles.summaryValue}>₱{earningsData.pending.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>Pending</Text>
          </View>
        </View>

        <View style={styles.payoutSection}>
          <View style={styles.payoutHeader}>
            <Text style={styles.sectionTitle}>Available for Payout</Text>
            <TouchableOpacity style={styles.payoutButton}>
              <CreditCard size={16} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.payoutButtonText}>Cash Out</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.payoutAmount}>₱{earningsData.available.toLocaleString()}</Text>
        </View>

        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <Text style={styles.sectionTitle}>Recent Earnings</Text>
            <TouchableOpacity style={styles.downloadButton}>
              <Download size={16} color="#6B7280" strokeWidth={2} />
            </TouchableOpacity>
          </View>
          
          {recentEarnings.map((earning) => (
            <View key={earning.id} style={styles.earningItem}>
              <View style={styles.earningInfo}>
                <Text style={styles.earningDescription}>{earning.description}</Text>
                <Text style={styles.earningDate}>
                  {new Date(earning.date).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.earningRight}>
                <Text style={styles.earningAmount}>₱{earning.amount}</Text>
                <View style={[
                  styles.earningStatus,
                  { backgroundColor: earning.status === 'paid' ? '#10B981' : '#F59E0B' }
                ]}>
                  <Text style={styles.earningStatusText}>
                    {earning.status === 'paid' ? 'Paid' : 'Pending'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  filterButton: {
    padding: 8,
  },
  totalEarningsCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  totalEarningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalEarningsLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  totalEarningsAmount: {
    fontSize: 32,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  totalEarningsSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#10B981',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activePeriodButton: {
    backgroundColor: '#3B82F6',
  },
  periodButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  activePeriodButtonText: {
    color: '#FFFFFF',
  },
  summaryCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryValue: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  payoutSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  payoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  payoutButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  payoutButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  payoutAmount: {
    fontSize: 28,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  historySection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  downloadButton: {
    padding: 8,
  },
  earningItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  earningInfo: {
    flex: 1,
  },
  earningDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    marginBottom: 4,
  },
  earningDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  earningRight: {
    alignItems: 'flex-end',
  },
  earningAmount: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  earningStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  earningStatusText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});