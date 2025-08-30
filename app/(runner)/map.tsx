import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { Navigation, MapPin, Phone, MessageCircle, CircleCheck as CheckCircle, Camera } from 'lucide-react-native';
import { mockErrands } from '@/data/mockData';

export default function RunnerMapScreen() {
  const { user } = useAuth();
  const [currentJob] = useState(mockErrands.find(e => e.runnerId === user?.id && e.status === 'in-progress'));
  const [jobStatus, setJobStatus] = useState(currentJob?.status || 'assigned');

  const updateJobStatus = (newStatus: string) => {
    setJobStatus(newStatus);
  };

  if (!currentJob) {
    return (
      <View style={styles.container}>
        <View style={styles.noJobContainer}>
          <MapPin size={64} color="#9CA3AF" strokeWidth={2} />
          <Text style={styles.noJobTitle}>No Active Job</Text>
          <Text style={styles.noJobDescription}>
            Accept a job from the dashboard to see navigation
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Mock Map Area */}
      <View style={styles.mapContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2' }}
          style={styles.mapImage}
        />
        <View style={styles.mapOverlay}>
          <TouchableOpacity style={styles.navigationButton}>
            <Navigation size={20} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.navigationText}>Navigate</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Job Details Card */}
      <View style={styles.jobCard}>
        <View style={styles.jobHeader}>
          <View style={styles.jobInfo}>
            <Text style={styles.jobTitle}>{currentJob.title}</Text>
            <Text style={styles.jobCategory}>
              {categories.find(c => c.id === currentJob.category)?.name}
            </Text>
          </View>
          <Text style={styles.jobFee}>₱{currentJob.fee}</Text>
        </View>

        <View style={styles.addressContainer}>
          <View style={styles.addressItem}>
            <View style={styles.addressDot} />
            <View style={styles.addressDetails}>
              <Text style={styles.addressLabel}>Pickup</Text>
              <Text style={styles.addressText}>{currentJob.pickupAddress}</Text>
            </View>
          </View>
          <View style={styles.addressLine} />
          <View style={styles.addressItem}>
            <View style={[styles.addressDot, styles.addressDotDestination]} />
            <View style={styles.addressDetails}>
              <Text style={styles.addressLabel}>Drop-off</Text>
              <Text style={styles.addressText}>{currentJob.dropoffAddress}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Phone size={20} color="#3B82F6" strokeWidth={2} />
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={20} color="#3B82F6" strokeWidth={2} />
            <Text style={styles.actionButtonText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Camera size={20} color="#3B82F6" strokeWidth={2} />
            <Text style={styles.actionButtonText}>Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statusContainer}>
          {jobStatus === 'assigned' && (
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => updateJobStatus('in-progress')}
            >
              <Text style={styles.primaryButtonText}>Start Job</Text>
            </TouchableOpacity>
          )}
          
          {jobStatus === 'in-progress' && (
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => updateJobStatus('picked-up')}
            >
              <Text style={styles.primaryButtonText}>Mark as Picked Up</Text>
            </TouchableOpacity>
          )}
          
          {jobStatus === 'picked-up' && (
            <TouchableOpacity 
              style={styles.completeButton}
              onPress={() => updateJobStatus('completed')}
            >
              <CheckCircle size={20} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.completeButtonText}>Complete Job</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E7EB',
  },
  mapOverlay: {
    position: 'absolute',
    top: 60,
    right: 24,
  },
  navigationButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  navigationText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  noJobContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 48,
  },
  noJobTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  noJobDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  jobCategory: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  jobFee: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  addressContainer: {
    marginBottom: 20,
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
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
    marginTop: 6,
  },
  statusContainer: {
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  completeButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  completeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});