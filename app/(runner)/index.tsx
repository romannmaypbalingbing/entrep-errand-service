import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Activity, DollarSign, Star, MapPin, Clock, CircleCheck as CheckCircle, Package } from 'lucide-react-native';
import { mockErrands, categories } from '@/data/mockData';

export default function RunnerDashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(true);
  
  const availableJobs = mockErrands.filter(e => e.status === 'posted');
  const assignedJobs = mockErrands.filter(e => e.runnerId === user?.id && e.status !== 'completed');

  const todayStats = {
    earnings: 450,
    completedJobs: 3,
    rating: 4.9,
    onlineHours: 6.5
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#10B981', '#059669']} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.runnerInfo}>
            <Image
              source={{ uri: user?.avatar || 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' }}
              style={styles.profileImage}
            />
            <View style={styles.runnerDetails}>
              <Text style={styles.runnerName}>{user?.name}</Text>
              <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: isOnline ? '#10B981' : '#6B7280' }]} />
                <Text style={styles.statusText}>{isOnline ? 'Online' : 'Offline'}</Text>
              </View>
            </View>
          </View>
          <Switch
            value={isOnline}
            onValueChange={setIsOnline}
            trackColor={{ false: '#E5E7EB', true: '#FFFFFF' }}
            thumbColor={isOnline ? '#10B981' : '#9CA3AF'}
          />
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Today's Performance</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <DollarSign size={24} color="#10B981" strokeWidth={2} />
              <Text style={styles.statValue}>₱{todayStats.earnings}</Text>
              <Text style={styles.statLabel}>Earnings</Text>
            </View>
            <View style={styles.statCard}>
              <CheckCircle size={24} color="#3B82F6" strokeWidth={2} />
              <Text style={styles.statValue}>{todayStats.completedJobs}</Text>
              <Text style={styles.statLabel}>Jobs Done</Text>
            </View>
            <View style={styles.statCard}>
              <Star size={24} color="#F59E0B" strokeWidth={2} />
              <Text style={styles.statValue}>{todayStats.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statCard}>
              <Clock size={24} color="#8B5CF6" strokeWidth={2} />
              <Text style={styles.statValue}>{todayStats.onlineHours}h</Text>
              <Text style={styles.statLabel}>Online</Text>
            </View>
          </View>
        </View>

        {assignedJobs.length > 0 && (
          <View style={styles.activeJobsContainer}>
            <Text style={styles.sectionTitle}>Current Jobs</Text>
            {assignedJobs.map((job) => (
              <TouchableOpacity 
                key={job.id} 
                style={styles.jobCard}
                onPress={() => router.push(`/job-details?id=${job.id}`)}
              >
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(job.status) }]}>
                    <Text style={styles.statusBadgeText}>{getStatusText(job.status)}</Text>
                  </View>
                </View>
                <Text style={styles.jobDescription} numberOfLines={2}>
                  {job.description}
                </Text>
                <View style={styles.jobFooter}>
                  <View style={styles.locationInfo}>
                    <MapPin size={16} color="#6B7280" strokeWidth={2} />
                    <Text style={styles.locationText}>{job.pickupAddress}</Text>
                  </View>
                  <Text style={styles.jobFee}>₱{job.fee}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {isOnline && availableJobs.length > 0 && (
          <View style={styles.availableJobsContainer}>
            <Text style={styles.sectionTitle}>Available Jobs Nearby</Text>
            {availableJobs.slice(0, 3).map((job) => {
              const category = categories.find(c => c.id === job.category);
              return (
                <TouchableOpacity 
                  key={job.id} 
                  style={styles.availableJobCard}
                  onPress={() => router.push(`/job-offer?id=${job.id}`)}
                >
                  <View style={styles.jobCardHeader}>
                    <View style={styles.jobInfo}>
                      <Text style={styles.jobTitle}>{job.title}</Text>
                      <Text style={styles.jobCategory}>{category?.name}</Text>
                    </View>
                    <View style={styles.distanceContainer}>
                      <Text style={styles.distanceText}>0.8 km</Text>
                      <Text style={styles.timeText}>~5 min</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.jobDescription} numberOfLines={2}>
                    {job.description}
                  </Text>
                  
                  <View style={styles.jobDetails}>
                    <View style={styles.locationInfo}>
                      <MapPin size={14} color="#6B7280" strokeWidth={2} />
                      <Text style={styles.locationText}>{job.pickupAddress}</Text>
                    </View>
                    <Text style={styles.jobFee}>₱{job.fee}</Text>
                  </View>
                  
                  <View style={styles.jobActions}>
                    <TouchableOpacity style={styles.acceptButton}>
                      <Text style={styles.acceptButtonText}>Accept Job</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {!isOnline && (
          <View style={styles.offlineState}>
            <Activity size={48} color="#9CA3AF" strokeWidth={2} />
            <Text style={styles.offlineTitle}>You're Offline</Text>
            <Text style={styles.offlineDescription}>
              Turn on availability to start receiving job requests
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'assigned': return '#3B82F6';
    case 'in-progress': return '#10B981';
    case 'picked-up': return '#8B5CF6';
    default: return '#6B7280';
  }
}

function getStatusText(status: string): string {
  switch (status) {
    case 'assigned': return 'New Job';
    case 'in-progress': return 'In Progress';
    case 'picked-up': return 'Picked Up';
    default: return status;
  }
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
  },
  runnerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginRight: 16,
  },
  runnerDetails: {
    flex: 1,
  },
  runnerName: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#E5E7EB',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  statsContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  activeJobsContainer: {
    marginBottom: 32,
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  jobDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  jobFee: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  availableJobsContainer: {
    marginBottom: 32,
  },
  availableJobCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  jobCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobInfo: {
    flex: 1,
    marginRight: 12,
  },
  jobCategory: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: 2,
  },
  distanceContainer: {
    alignItems: 'flex-end',
  },
  distanceText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  jobActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  acceptButton: {
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  acceptButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  offlineState: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  offlineTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  offlineDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});