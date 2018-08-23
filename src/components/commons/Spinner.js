import React from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';

const Spinner = ({status}) => {
    return(
        <Modal
            animationType="fade"
            transparent={true}
            visible={status}
            onRequestClose={ () => console.log('on request') }
        >
            <View style={styles.modalDialog}>
                <ActivityIndicator 
                    size="large" 
                    color="#F44336" 
                    animating={true}
                    style={{alignSelf: 'center'}}
                />
            </View>
        </Modal>
    );
}

export {Spinner};

const styles = {
  container: {
    flex: 1
  },
  modalDialog: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
}
};