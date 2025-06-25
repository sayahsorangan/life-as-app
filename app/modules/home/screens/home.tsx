import React, {useState, useRef} from 'react';
import {FlatList, TouchableOpacity, StyleSheet, TextInput, Animated, ScrollView} from 'react-native';
import {Box, Text, useTheme} from '@app/themes';
import {Container} from '@components/container';
import {Modal} from '@components/modal';
import {Button} from '@components/button/button';
import {Icons} from '@app/assets/icons';
import {IconButton} from '@components/button/icon-button';

interface Profession {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: keyof typeof import('@app/themes').theme.colors;
  detailedDescription: string;
  dailyRoutine: string[];
  requirements: string[];
  benefits: string[];
  averageSalary: string;
  workEnvironment: string;
}

const professions: Profession[] = [
  {
    id: '1',
    title: 'Software Engineer',
    description: 'Building the digital future',
    icon: '💻',
    color: 'primary',
    detailedDescription:
      'Software engineers design, develop, and maintain software systems that power our digital world. They solve complex problems through code and create innovative solutions.',
    dailyRoutine: [
      '09:00 - Daily standup meeting',
      '09:30 - Code review and planning',
      '10:00 - Development work',
      '12:00 - Lunch break',
      '13:00 - Collaborative coding',
      '15:00 - Testing and debugging',
      '16:00 - Documentation',
      '17:00 - Learning new technologies',
    ],
    requirements: [
      "Bachelor's in Computer Science",
      'Programming skills',
      'Problem-solving abilities',
      'Team collaboration',
    ],
    benefits: ['High salary potential', 'Remote work options', 'Creative problem solving', 'Continuous learning'],
    averageSalary: '$85,000 - $150,000',
    workEnvironment: 'Office or remote, collaborative team environment',
  },
  {
    id: '2',
    title: 'Designer',
    description: 'Crafting beautiful experiences',
    icon: '🎨',
    color: 'secondary',
    detailedDescription:
      'Designers create visual concepts and user experiences that communicate ideas, inspire, and captivate consumers through various media.',
    dailyRoutine: [
      '09:00 - Check briefs and priorities',
      '09:30 - Research and inspiration',
      '10:30 - Concept development',
      '12:00 - Lunch break',
      '13:00 - Design execution',
      '15:00 - Client/stakeholder feedback',
      '16:00 - Revisions and refinements',
      '17:00 - Portfolio updates',
    ],
    requirements: [
      'Design degree or portfolio',
      'Creative software skills',
      'Visual communication',
      'Client interaction',
    ],
    benefits: ['Creative expression', 'Diverse projects', 'Visual impact', 'Flexible schedules'],
    averageSalary: '$45,000 - $85,000',
    workEnvironment: 'Studios, agencies, or freelance from anywhere',
  },
  {
    id: '3',
    title: 'Doctor',
    description: 'Healing and caring for others',
    icon: '⚕️',
    color: 'success',
    detailedDescription:
      'Doctors diagnose and treat illnesses, injuries, and disorders. They provide medical care and improve the health and well-being of patients.',
    dailyRoutine: [
      '07:00 - Hospital rounds',
      '08:00 - Patient consultations',
      '10:00 - Procedures/surgeries',
      '12:00 - Lunch break',
      '13:00 - More patient visits',
      '15:00 - Documentation',
      '16:00 - Medical research',
      '17:00 - Emergency cases if needed',
    ],
    requirements: ['Medical degree', 'Residency training', 'Medical license', 'Compassion and empathy'],
    benefits: ['Saving lives', 'High respect', 'Job security', 'Intellectual challenge'],
    averageSalary: '$200,000 - $400,000',
    workEnvironment: 'Hospitals, clinics, private practice',
  },
  {
    id: '4',
    title: 'Teacher',
    description: 'Inspiring the next generation',
    icon: '📚',
    color: 'warning',
    detailedDescription:
      'Teachers educate students and help them develop academic skills, critical thinking, and character. They shape the future through education.',
    dailyRoutine: [
      '07:30 - Prepare classroom',
      '08:00 - Morning classes',
      '10:00 - Break supervision',
      '10:30 - More classes',
      '12:00 - Lunch break',
      '13:00 - Afternoon classes',
      '15:00 - Grading and planning',
      '16:00 - Student support/meetings',
    ],
    requirements: ['Education degree', 'Teaching certification', 'Subject expertise', 'Patience and communication'],
    benefits: ['Making a difference', 'Summer breaks', 'Job stability', 'Community respect'],
    averageSalary: '$40,000 - $70,000',
    workEnvironment: 'Schools, classrooms, educational institutions',
  },
  {
    id: '5',
    title: 'Chef',
    description: 'Creating culinary masterpieces',
    icon: '👨‍🍳',
    color: 'tertiary',
    detailedDescription:
      'Chefs create, prepare, and present food. They manage kitchen operations and develop recipes that delight diners with exceptional flavors.',
    dailyRoutine: [
      '10:00 - Menu planning',
      '11:00 - Ingredient preparation',
      '12:00 - Lunch service',
      '14:00 - Break and cleanup',
      '15:00 - Dinner prep',
      '17:00 - Dinner service',
      '21:00 - Kitchen cleanup',
      "22:00 - Tomorrow's planning",
    ],
    requirements: ['Culinary training', 'Food safety knowledge', 'Creativity', 'Physical stamina'],
    benefits: ['Creative expression', 'Immediate feedback', 'Cultural exploration', 'Entrepreneurial opportunities'],
    averageSalary: '$35,000 - $75,000',
    workEnvironment: 'Restaurants, hotels, catering companies',
  },
  {
    id: '6',
    title: 'Photographer',
    description: "Capturing life's moments",
    icon: '📸',
    color: 'info',
    detailedDescription:
      'Photographers capture images that tell stories, preserve memories, and create art. They work in various specialties from weddings to wildlife.',
    dailyRoutine: [
      '09:00 - Equipment check',
      '10:00 - Photo shoots',
      '12:00 - Lunch break',
      '13:00 - More shoots/travel',
      '15:00 - Photo editing',
      '17:00 - Client communications',
      '18:00 - Portfolio work',
      '19:00 - Business development',
    ],
    requirements: ['Photography skills', 'Equipment knowledge', 'Artistic eye', 'Client service'],
    benefits: ['Creative freedom', 'Travel opportunities', 'Flexible schedule', 'Artistic expression'],
    averageSalary: '$30,000 - $80,000',
    workEnvironment: 'Various locations, studios, outdoor settings',
  },
  {
    id: '7',
    title: 'Architect',
    description: 'Designing spaces that inspire',
    icon: '🏗️',
    color: 'accent_1',
    detailedDescription:
      'Architects design buildings and structures that are both functional and aesthetically pleasing. They shape the physical environment we live in.',
    dailyRoutine: [
      '08:00 - Site visits',
      '10:00 - Design work',
      '12:00 - Lunch break',
      '13:00 - Client meetings',
      '14:30 - Technical drawings',
      '16:00 - Team collaboration',
      '17:00 - Project planning',
      '18:00 - Design research',
    ],
    requirements: ['Architecture degree', 'License', 'Technical skills', 'Creative vision'],
    benefits: ['Lasting impact', 'Creative challenge', 'Good salary', 'Professional prestige'],
    averageSalary: '$70,000 - $120,000',
    workEnvironment: 'Offices, construction sites, client locations',
  },
  {
    id: '8',
    title: 'Musician',
    description: 'Creating harmony and rhythm',
    icon: '🎵',
    color: 'accent_2',
    detailedDescription:
      'Musicians create, perform, and record music. They express emotions and tell stories through sound, entertaining and inspiring audiences.',
    dailyRoutine: [
      '10:00 - Practice session',
      '12:00 - Lunch break',
      '13:00 - Composition work',
      '15:00 - Recording/rehearsal',
      '17:00 - Performance prep',
      '19:00 - Evening performance',
      '22:00 - Networking',
      '23:00 - Music study',
    ],
    requirements: ['Musical training', 'Performance skills', 'Creativity', 'Dedication'],
    benefits: ['Artistic expression', 'Emotional connection', 'Travel opportunities', 'Cultural impact'],
    averageSalary: '$25,000 - $100,000+',
    workEnvironment: 'Studios, concert halls, venues, home studios',
  },
];

const getItemLightColor = (color: keyof typeof import('@app/themes').theme.colors) => {
  const lightColorMap: Record<string, keyof typeof import('@app/themes').theme.colors> = {
    primary: 'primary_light',
    secondary: 'secondary_light',
    tertiary: 'tertiary_light',
    success: 'success_light',
    warning: 'warning_light',
    info: 'info_light',
    accent_1: 'accent_1_light',
    accent_2: 'accent_2_light',
  };
  return lightColorMap[color] || 'grey_light';
};

export const Home = () => {
  const {colors} = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProfessionData, setSelectedProfessionData] = useState<Profession | null>(null);

  const styles = StyleSheet.create({
    professionCard: {
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    selectedCard: {
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
    selectedIconContainer: {
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    listContainer: {
      paddingBottom: 24,
      paddingTop: 16,
    },
    searchContainer: {
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 1,
    },
    searchInput: {
      fontSize: 16,
      color: colors.black,
      paddingVertical: 8,
      fontFamily: 'System',
    },
    clearButton: {
      padding: 8,
      marginLeft: 4,
    },
    stickySearchContainer: {
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      zIndex: 1000,
    },
  });

  const filteredProfessions = professions.filter(
    profession =>
      profession.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profession.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderProfessionItem = ({item}: {item: Profession}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        setSelectedProfessionData(item);
        setShowModal(true);
      }}
    >
      <Box
        backgroundColor="white"
        marginHorizontal="md"
        marginVertical="xs"
        paddingHorizontal="lg"
        paddingVertical="lg"
        borderRadius="md"
        style={styles.professionCard}
      >
        <Box flexDirection="row" alignItems="center">
          <Box
            backgroundColor={getItemLightColor(item.color)}
            width={60}
            height={60}
            borderRadius="md"
            justifyContent="center"
            alignItems="center"
            marginRight="lg"
          >
            <Text variant="h_4_semibold">{item.icon}</Text>
          </Box>

          <Box flex={1}>
            <Text variant="h_6_semibold" color="black" marginBottom="xxs">
              {item.title}
            </Text>
            <Text variant="body_helper_regular" color="grey" opacity={0.7}>
              {item.description}
            </Text>
          </Box>

          <Box
            width={32}
            height={32}
            borderRadius="sm"
            backgroundColor={getItemLightColor(item.color)}
            justifyContent="center"
            alignItems="center"
          >
            <Icons.Feather name="chevron-right" color={colors.black} />
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );

  return (
    <Container backgroundColor={colors.white}>
      <Box backgroundColor="white" paddingHorizontal="lg" paddingVertical="md" style={styles.stickySearchContainer}>
        <Box
          backgroundColor="grey_light"
          borderRadius="md"
          paddingHorizontal="md"
          paddingVertical="xs"
          style={styles.searchContainer}
          flexDirection="row"
          alignItems="center"
        >
          <Box flex={1}>
            <TextInput
              placeholder="Search professions..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
              placeholderTextColor={colors.grey_dark}
            />
          </Box>
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <Text variant="body_regular" style={{fontSize: 16, color: colors.black}}>
                ✕
              </Text>
            </TouchableOpacity>
          )}
        </Box>
      </Box>

      <Box flex={1} backgroundColor="background">
        <FlatList
          data={filteredProfessions}
          renderItem={renderProfessionItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponentStyle={{}}
          ListEmptyComponent={
            <Box padding="xl" alignItems="center">
              <Box
                backgroundColor="grey_light"
                width={80}
                height={80}
                borderRadius="xl"
                justifyContent="center"
                alignItems="center"
                marginBottom="lg"
              >
                <Text variant="h_3_regular">🔍</Text>
              </Box>
              <Text variant="h_6_semibold" color="black" marginBottom="xs">
                No professions found
              </Text>
              <Text variant="body_regular" color="grey" textAlign="center" lineHeight={20}>
                Try adjusting your search terms or{'\n'}explore all available professions
              </Text>
            </Box>
          }
        />
      </Box>

      {/* Profession Details Modal */}
      <Modal show={showModal} onDissmiss={() => setShowModal(false)} animationType="slide">
        <Box
          backgroundColor="white"
          borderRadius="lg"
          marginHorizontal="md"
          maxHeight="90%"
          style={{
            shadowColor: colors.black,
            shadowOffset: {width: 0, height: 10},
            shadowOpacity: 0.25,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          {selectedProfessionData && (
            <>
              {/* Header */}
              <Box
                backgroundColor={selectedProfessionData.color}
                borderTopLeftRadius="lg"
                borderTopRightRadius="lg"
                paddingHorizontal="lg"
                paddingVertical="lg"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box flexDirection="row" alignItems="center" flex={1}>
                  <Box
                    width={48}
                    height={48}
                    borderRadius="sm"
                    justifyContent="center"
                    alignItems="center"
                    style={{backgroundColor: '#ffffff'}}
                  >
                    <Text variant="h_4_semibold">{selectedProfessionData.icon}</Text>
                  </Box>
                  <Box flex={1} marginHorizontal={'md'}>
                    <Text variant="h_5_semibold" color="white" marginBottom="xxs">
                      {selectedProfessionData.title}
                    </Text>
                    <Text variant="body_regular" color="white" opacity={0.9}>
                      {selectedProfessionData.description}
                    </Text>
                  </Box>
                  <IconButton
                    icon_name="x"
                    ButtonStyle={{
                      alignSelf: 'flex-start',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                    }}
                    icon_size={20}
                    icon_color={colors.white}
                    onPress={() => setShowModal(false)}
                  />
                </Box>
              </Box>

              {/* Content */}
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
                <Box padding={'lg'}>
                  {/* Description */}
                  <Text variant="body_regular" color="black" lineHeight={22} marginBottom="lg">
                    {selectedProfessionData.detailedDescription}
                  </Text>

                  {/* Daily Routine */}
                  <Text variant="h_6_semibold" color="black" marginBottom="md">
                    📅 Daily Routine
                  </Text>
                  {selectedProfessionData.dailyRoutine.map((routine, index) => (
                    <Box key={index} marginBottom="xs" flexDirection="row" alignItems="flex-start">
                      <Text variant="body_regular" color="grey" marginRight="sm">
                        •
                      </Text>
                      <Text variant="body_regular" color="black" flex={1}>
                        {routine}
                      </Text>
                    </Box>
                  ))}

                  {/* Requirements */}
                  <Text variant="h_6_semibold" color="black" marginTop="lg" marginBottom="md">
                    ✅ Requirements
                  </Text>
                  {selectedProfessionData.requirements.map((requirement, index) => (
                    <Box key={index} marginBottom="xs" flexDirection="row" alignItems="flex-start">
                      <Text variant="body_regular" color="grey" marginRight="sm">
                        •
                      </Text>
                      <Text variant="body_regular" color="black" flex={1}>
                        {requirement}
                      </Text>
                    </Box>
                  ))}

                  {/* Benefits */}
                  <Text variant="h_6_semibold" color="black" marginTop="lg" marginBottom="md">
                    🎁 Benefits
                  </Text>
                  {selectedProfessionData.benefits.map((benefit, index) => (
                    <Box key={index} marginBottom="xs" flexDirection="row" alignItems="flex-start">
                      <Text variant="body_regular" color="grey" marginRight="sm">
                        •
                      </Text>
                      <Text variant="body_regular" color="black" flex={1}>
                        {benefit}
                      </Text>
                    </Box>
                  ))}

                  {/* Environment */}
                  <Text variant="h_6_semibold" color="black" marginTop="lg" marginBottom="sm">
                    🏢 Work Environment
                  </Text>
                  <Text variant="body_regular" color="black">
                    {selectedProfessionData.workEnvironment}
                  </Text>

                  {/* Salary */}
                  <Text variant="h_6_semibold" color="black" marginTop="lg" marginBottom="sm">
                    💰 Average Salary
                  </Text>
                  <Text variant="body_regular" color="black">
                    {selectedProfessionData.averageSalary}
                  </Text>
                </Box>
              </ScrollView>

              {/* Bottom Button */}
              <Box paddingHorizontal="lg" paddingVertical="lg" borderTopWidth={1} borderTopColor="grey_light">
                <Button
                  label={`Start your life as ${selectedProfessionData.title}`}
                  onPress={() => {
                    setShowModal(false);
                    // Add your navigation logic here
                    console.log(`Starting life as ${selectedProfessionData.title}`);
                  }}
                  ButtonStyle={{
                    backgroundColor: colors[selectedProfessionData.color],
                    borderColor: colors[selectedProfessionData.color],
                  }}
                />
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};
