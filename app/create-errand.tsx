import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Camera, 
  CreditCard,
  Clock
} from 'lucide-react-native';
import { categories, paymentMethods } from '@/data/mockData';

export default function CreateErrandScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [schedulingType, setSchedulingType] = useState<'asap' | 'later'>('asap');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pickupAddress: '',
    dropoffAddress: '',
    instructions: '',
    scheduledDate: '',
    scheduledTime: ''
  });

  const [estimatedCost] = useState({
    serviceFee: 50,
    estimatedItems: 200,
    total: 250
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !selectedCategory || !formData.pickupAddress) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Errand Created',
      'Your errand has been posted and we\'re finding a runner for you!',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#111827" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.title}>Create Errand</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Errand Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Errand Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="What do you need help with?"
              placeholderTextColor="#9CA3AF"
              value={formData.title}
              onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category.id && styles.activeCategoryChip
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text style={[
                    styles.categoryChipText,
                    selectedCategory === category.id && styles.activeCategoryChipText
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe what you need in detail..."
              placeholderTextColor="#9CA3AF"
              value={formData.description}
              onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Special Instructions</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Any specific requirements or notes..."
              placeholderTextColor="#9CA3AF"
              value={formData.instructions}
              onChangeText={(text) => setFormData(prev => ({ ...prev, instructions: text }))}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pickup Address *</Text>
            <View style={styles.addressInput}>
              <MapPin size={20} color="#9CA3AF" strokeWidth={2} />
              <TextInput
                style={styles.addressTextInput}
                placeholder="Enter pickup location"
                placeholderTextColor="#9CA3AF"
                value={formData.pickupAddress}
                onChangeText={(text) => setFormData(prev => ({ ...prev, pickupAddress: text }))}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Drop-off Address</Text>
            <View style={styles.addressInput}>
              <MapPin size={20} color="#9CA3AF" strokeWidth={2} />
              <TextInput
                style={styles.addressTextInput}
                placeholder="Enter drop-off location"
                placeholderTextColor="#9CA3AF"
                value={formData.dropoffAddress}
                onChangeText={(text) => setFormData(prev => ({ ...prev, dropoffAddress: text }))}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scheduling</Text>
          
          <View style={styles.schedulingOptions}>
            <TouchableOpacity
              style={[
                styles.schedulingOption,
                schedulingType === 'asap' && styles.activeSchedulingOption
              ]}
              onPress={() => setSchedulingType('asap')}
            >
              <Clock size={20} color={schedulingType === 'asap' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />
              <Text style={[
                styles.schedulingOptionText,
                schedulingType === 'asap' && styles.activeSchedulingOptionText
              ]}>
                ASAP
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.schedulingOption,
                schedulingType === 'later' && styles.activeSchedulingOption
              ]}
              onPress={() => setSchedulingType('later')}
            >
              <Calendar size={20} color={schedulingType === 'later' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />
              <Text style={[
                styles.schedulingOptionText,
                schedulingType === 'later' && styles.activeSchedulingOptionText
              ]}>
                Schedule Later
              </Text>
            </TouchableOpacity>
          </View>

          {schedulingType === 'later' && (
            <View style={styles.dateTimeInputs}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Select date"
                  placeholderTextColor="#9CA3AF"
                  value={formData.scheduledDate}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, scheduledDate: text }))}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Time</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Select time"
                  placeholderTextColor="#9CA3AF"
                  value={formData.scheduledTime}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, scheduledTime: text }))}
                />
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attachments</Text>
          <TouchableOpacity style={styles.photoUpload}>
            <Camera size={24} color="#6B7280" strokeWidth={2} />
            <Text style={styles.photoUploadText}>Add Photos (Optional)</Text>
            <Text style={styles.photoUploadSubtext}>Help runners understand your request better</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment</Text>
          
          <View style={styles.costBreakdown}>
            <View style={styles.costItem}>
              <Text style={styles.costLabel}>Service Fee</Text>
              <Text style={styles.costValue}>₱{estimatedCost.serviceFee}</Text>
            </View>
            <View style={styles.costItem}>
              <Text style={styles.costLabel}>Estimated Item Cost</Text>
              <Text style={styles.costValue}>₱{estimatedCost.estimatedItems}</Text>
            </View>
            <View style={[styles.costItem, styles.totalCost]}>
              <Text style={styles.totalCostLabel}>Total Estimate</Text>
              <Text style={styles.totalCostValue}>₱{estimatedCost.total}</Text>
            </View>
          </View>

          <Text style={[styles.label, { marginTop: 16 }]}>Payment Method</Text>
          <View style={styles.paymentMethods}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethod,
                  selectedPayment === method.id && styles.activePaymentMethod
                ]}
                onPress={() => setSelectedPayment(method.id)}
              >
                <CreditCard size={20} color={method.color} strokeWidth={2} />
                <Text style={styles.paymentMethodText}>{method.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.submitButton, (!formData.title || !selectedCategory) && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!formData.title || !selectedCategory}
        >
          <Text style={styles.submitButtonText}>Post Errand</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
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
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryScroll: {
    marginBottom: 8,
  },
  categoryChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeCategoryChip: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  categoryChipText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  activeCategoryChipText: {
    color: '#FFFFFF',
  },
  addressInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  addressTextInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  schedulingOptions: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  schedulingOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeSchedulingOption: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  schedulingOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 8,
  },
  activeSchedulingOptionText: {
    color: '#FFFFFF',
  },
  dateTimeInputs: {
    flexDirection: 'row',
  },
  photoUpload: {
    backgroundColor: '#F9FAFB',
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  photoUploadText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: 8,
  },
  photoUploadSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center',
  },
  costBreakdown: {
    marginBottom: 16,
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
  paymentMethods: {
    marginTop: 8,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activePaymentMethod: {
    backgroundColor: '#3B82F615',
    borderColor: '#3B82F6',
  },
  paymentMethodText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    marginLeft: 12,
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});