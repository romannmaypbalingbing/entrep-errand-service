import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Alert
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock,
  CheckCircle,
  Package,
  Receipt,
  HeadphonesIcon as Headphones,
  CircleHelp as HelpCircle
} from 'lucide-react-native';
import { mockErrands, mockRunners, categories } from '@/data/mockData';

export default function TrackOrderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [currentStatus, setCurrentStatus] = useState('on-my-way');
  
  // Mock data - in real app, this would come from the errand ID
  const errand = mockErrands[0]; // Using first errand as example
  const runner = mockRunners.find(r => r.id === errand.runnerId);
  const category = categories.find(c => c.id === errand.category);

  const statusSteps = [
    { id: 'on-my-way', label: 'On my way', completed: true },
    { id: 'picked-up', label: 'Picked up item', completed: currentStatus !== 'on-my-way' },
    { id: 'delivered', label: 'Delivered', completed: currentStatus === 'delivered' }
  ];

  const costBreakdown = {
    serviceFee: 50,
    itemCost: 180,
    tip: 20,
    platformFee: 15,
    total: 265
  };

  const feeAllocation = [
    { label: 'Runner Payment', amount: 120, percentage: 45 },
    { label: 'Platform Fee', amount: 15, percentage: 6 },
    { label: 'Service Fee', amount: 50, percentage: 19 },
    { label: 'Processing Fee', amount: 10, percentage: 4 },
    { label: 'Insurance', amount: 5, percentage: 2 },
    { label: 'Item Cost', amount: 180, percentage: 68 }
  ];

  useEffect(() => {
    // Simulate status updates
    const timer = setTimeout(() => {
      if (currentStatus === 'on-my-way') {
        setCurrentStatus('picked-up');
      } else if (currentStatus === 'picked-up') {
        setCurrentStatus('delivered');
      }
    }, 10000); // Update every 10 seconds for demo

    return () => clearTimeout(timer);
  }, [currentStatus]);

  const handleContactRunner = () => {
    Alert.alert('Contact Runner', 'Choose how to contact your runner', [
      { text: 'Call', onPress: () => console.log('Calling runner...') },
      { text: 'Message', onPress: () => router.push('/messages') },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const handleHelpCenter = () => {
    Alert.alert('Help Center', 'How can we help you?', [
      { text: 'Report Issue', onPress: () => console.log('Reporting issue...') },
      { text: 'FAQ', onPress: () => console.log('Opening FAQ...') },
      { text: 'Live Chat', onPress: () => console.log('Starting live chat...') },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#111827" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.title}>Track Order</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Map Section */}
        <View style={styles.mapContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2' }}
            style={styles.mapImage}
          />
          <View style={styles.mapOverlay}>
            <View style={styles.runnerLocationCard}>
              <Image
                source={{ uri: runner?.avatar }}
                style={styles.runnerAvatar}
              />
              <View style={styles.runnerLocationInfo}>
                <Text style={styles.runnerLocationName}>{runner?.name}</Text>
                <Text style={styles.runnerLocationStatus}>
                  {currentStatus === 'on-my-way' ? 'Heading to pickup' : 
                   currentStatus === 'picked-up' ? 'On the way to you' : 'Delivered'}
                </Text>
              </View>
              <TouchableOpacity 
                style={styles.contactButton}
                onPress={handleContactRunner}
              >
                <Phone size={16} color="#3B82F6" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Errand Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Errand Details</Text>
          <View style={styles.errandInfo}>
            <View style={styles.errandHeader}>
              <Text style={styles.errandTitle}>{errand.title}</Text>
              <Text style={styles.errandCategory}>{category?.name}</Text>
            </View>
            <Text style={styles.errandDescription}>{errand.description}</Text>
            
            <View style={styles.addressContainer}>
              <View style={styles.addressItem}>
                <View style={styles.addressDot} />
                <View style={styles.addressDetails}>
                  <Text style={styles.addressLabel}>Pickup</Text>
                  <Text style={styles.addressText}>{errand.pickupAddress}</Text>
                </View>
              </View>
              <View style={styles.addressLine} />
              <View style={styles.addressItem}>
                <View style={[styles.addressDot, styles.addressDotDestination]} />
                <View style={styles.addressDetails}>
                  <Text style={styles.addressLabel}>Drop-off</Text>
                  <Text style={styles.addressText}>{errand.dropoffAddress}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Status Updates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status Updates</Text>
          <View style={styles.statusContainer}>
            {statusSteps.map((step, index) => (
              <View key={step.id} style={styles.statusStep}>
                <View style={styles.statusLeft}>
                  <View style={[
                    styles.statusDot,
                    step.completed && styles.statusDotCompleted,
                    currentStatus === step.id && styles.statusDotActive
                  ]}>
                    {step.completed && <CheckCircle size={16} color="#FFFFFF" strokeWidth={2} />}
                  </View>
                  {index < statusSteps.length - 1 && (
                    <View style={[
                      styles.statusLine,
                      step.completed && styles.statusLineCompleted
                    ]} />
                  )}
                </View>
                <View style={styles.statusContent}>
                  <Text style={[
                    styles.statusLabel,
                    step.completed && styles.statusLabelCompleted
                  ]}>
                    {step.label}
                  </Text>
                  {step.completed && (
                    <Text style={styles.statusTime}>
                      {step.id === 'on-my-way' ? '2:30 PM' : 
                       step.id === 'picked-up' ? '2:45 PM' : '3:15 PM'}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Cost Breakdown */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Receipt & Cost Breakdown</Text>
            <TouchableOpacity style={styles.receiptButton}>
              <Receipt size={16} color="#3B82F6" strokeWidth={2} />
              <Text style={styles.receiptButtonText}>View Receipt</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.costBreakdown}>
            <View style={styles.costItem}>
              <Text style={styles.costLabel}>Service Fee</Text>
              <Text style={styles.costValue}>₱{costBreakdown.serviceFee}</Text>
            </View>
            <View style={styles.costItem}>
              <Text style={styles.costLabel}>Item Cost</Text>
              <Text style={styles.costValue}>₱{costBreakdown.itemCost}</Text>
            </View>
            <View style={styles.costItem}>
              <Text style={styles.costLabel}>Tip</Text>
              <Text style={styles.costValue}>₱{costBreakdown.tip}</Text>
            </View>
            <View style={styles.costItem}>
              <Text style={styles.costLabel}>Platform Fee</Text>
              <Text style={styles.costValue}>₱{costBreakdown.platformFee}</Text>
            </View>
            <View style={[styles.costItem, styles.totalCost]}>
              <Text style={styles.totalCostLabel}>Total Amount</Text>
              <Text style={styles.totalCostValue}>₱{costBreakdown.total}</Text>
            </View>
          </View>

          <View style={styles.feeAllocation}>
            <Text style={styles.allocationTitle}>Fee Allocation</Text>
            {feeAllocation.map((allocation, index) => (
              <View key={index} style={styles.allocationItem}>
                <View style={styles.allocationInfo}>
                  <Text style={styles.allocationLabel}>{allocation.label}</Text>
                  <Text style={styles.allocationPercentage}>{allocation.percentage}%</Text>
                </View>
                <Text style={styles.allocationAmount}>₱{allocation.amount}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Support Center */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support Center</Text>
          <View style={styles.supportButtons}>
            <TouchableOpacity 
              style={styles.supportButton}
              onPress={handleContactRunner}
            >
              <Phone size={20} color="#3B82F6" strokeWidth={2} />
              <Text style={styles.supportButtonText}>Contact Runner</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.supportButton}
              onPress={handleHelpCenter}
            >
              <HelpCircle size={20} color="#10B981" strokeWidth={2} />
              <Text style={styles.supportButtonText}>Help Center</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.emergencyButton}>
            <Headphones size={20} color="#EF4444" strokeWidth={2} />
            <Text style={styles.emergencyButtonText}>Emergency Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    height: 250,
    position: 'relative',
    marginBottom: 16,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E7EB',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 24,
    right: 24,
  },
  runnerLocationCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  runnerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  runnerLocationInfo: {
    flex: 1,
  },
  runnerLocationName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  runnerLocationStatus: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#10B981',
    marginTop: 2,
  },
  contactButton: {
    backgroundColor: '#F3F4F6',
    padding: 8,
    borderRadius: 8,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  receiptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  receiptButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
    marginLeft: 4,
  },
  errandInfo: {
    marginBottom: 16,
  },
  errandHeader: {
    marginBottom: 8,
  },
  errandTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  errandCategory: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  errandDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  addressContainer: {
    marginTop: 16,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3B82F6',
    marginTop: 4,
    marginRight: 12,
  },
  addressDotDestination: {
    backgroundColor: '#10B981',
  },
  addressLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E5E7EB',
    marginLeft: 5,
    marginVertical: 4,
  },
  addressDetails: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 2,
  },
  addressText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    lineHeight: 20,
  },
  statusContainer: {
    paddingLeft: 8,
  },
  statusStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  statusLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  statusDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusDotCompleted: {
    backgroundColor: '#10B981',
  },
  statusDotActive: {
    backgroundColor: '#3B82F6',
  },
  statusLine: {
    width: 2,
    height: 32,
    backgroundColor: '#E5E7EB',
    marginTop: 8,
  },
  statusLineCompleted: {
    backgroundColor: '#10B981',
  },
  statusContent: {
    flex: 1,
    paddingTop: 2,
  },
  statusLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  statusLabelCompleted: {
    color: '#111827',
  },
  statusTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#10B981',
    marginTop: 2,
  },
  costBreakdown: {
    marginBottom: 20,
  },
  costItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  costLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  costValue: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#111827',
  },
  totalCost: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
    marginTop: 8,
  },
  totalCostLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  totalCostValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  feeAllocation: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
  },
  allocationTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 12,
  },
  allocationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  allocationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  allocationLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    flex: 1,
  },
  allocationPercentage: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginLeft: 8,
  },
  allocationAmount: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#111827',
  },
  supportButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  supportButton: {
    backgroundColor: '#F3F4F6',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  supportButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginLeft: 8,
  },
  emergencyButton: {
    backgroundColor: '#FEF2F2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  emergencyButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
    marginLeft: 8,
  },
});