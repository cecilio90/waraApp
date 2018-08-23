import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ children, menuPress, icon, iconCalendar, calendarPress }) => {
	const { containerHeader, textHeader } = styles;
	return (
		<View style={containerHeader}>
			<TouchableOpacity 
				style={styles.buttonBurger}
				onPress={menuPress}
			>
				<Ionicons name={icon} size={35} color="#fff"/>
			</TouchableOpacity>
			<View style={styles.title}>
				<Text style={textHeader}>{children}</Text>
			</View>
			<TouchableOpacity 
				style={styles.buttonBurger}
				onPress={calendarPress}
			>
				<Ionicons name={iconCalendar} size={35} color="#fff"/>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	containerHeader: {
		backgroundColor: '#f14e3b',
		alignItems: 'center',
		flexDirection: 'row',
		height: 50,
		padding: 7,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 1},
		shadowOpacity: 1,
		elevation: 2,
		position: 'relative',
	},
	buttonBurger: {
		width: 40,
		height: 50, 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	title: {
		flex: 2, 
		height: 50, 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	textHeader: {
		fontSize: 22,
		color: 'white',
		marginRight: 10
	}
});

export { Header };