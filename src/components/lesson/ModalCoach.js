import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";

const ModalCoach = ({ visible, coach, coachDescription, hideModal }) => {
    return (
        <View style={styles.container}>
            <Modal 
                isVisible={visible}
                animationInTiming={500}
                animationOutTiming={500}
                backdropTransitionInTiming={500}
                backdropTransitionOutTiming={500}
                backdropColor={'transparent'}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.header}>{coach}</Text>
                    <Text style={styles.content}>{coachDescription}</Text>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={hideModal}
                    >
                        <Text style={styles.buttonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = {
    container: {
        flex: 1
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        paddingBottom: 6,
    },
    content: {
        paddingTop: 6
    },
    button: {
        marginTop: 7,
        paddingVertical: 7,
        paddingHorizontal: 20,
        backgroundColor: '#f14e3b',
        borderRadius: 5
    },
    buttonText: {
        color: 'white',
        fontSize: 14
    }
}

export default ModalCoach;