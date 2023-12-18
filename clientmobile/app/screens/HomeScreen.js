import {FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View} from 'react-native';
import {useEffect, useState} from 'react';
import DropMenu from '../components/DropMenu';
import React, { Component } from 'react'
import Swiper from 'react-native-swiper'
import DialogPost from '../components/dialog/DialogPost';
import DialogWork from '../components/dialog/DialogWork';
import DialogDelete from '../components/dialog/DialogDelete';
import * as FileSystem from 'expo-file-system';
import {useCustomColorScheme} from '../components/ColorSchemeContext';
import ThemeSwitch from '../components/ThemeSwitch';
import EmployeeService from '../services/EmployeeService';
import MapView, {Marker} from 'react-native-maps';
import Map from '../components/Map';


export default function HomeScreen({navigation, route}) {
    const [selectedEmployee, setSelectedEmployee] = useState({})
    const [employees, setEmployees] = useState(route.params.employee)
    const [viewEmployees, setViewEmployees] = useState(employees)
    const [visibleDeleteDialog, setVisibleDeleteDialog] = useState(false)
    const [visiblePostDialog, setVisiblePostDialog] = useState(false)
    const [visibleWorkDialog, setVisibleWorkDialog] = useState(false)
    const [post, setPost] = useState('')
    const [dayNumber, setDayNumber] = useState(1)
    const { colorScheme, setCustomColorScheme } = useCustomColorScheme();
    const [showMap, setShowMap] = useState(false);

    const styles = StyleSheet.create({
        container: {
            flex: 1,

            backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
        },
        text: {
            color: colorScheme === 'dark' ? 'white' : 'black',
        },
        button: {
            backgroundColor: colorScheme === 'dark' ? 'gray' : 'lightgray',
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
        },
        buttonText: {
            color: colorScheme === 'dark' ? 'white' : 'black',
        },
        flexcontainer: {
            flex: 1,
            marginBottom:-100
        },
        menu: {

        },
    });

    useEffect(() => {
        setViewEmployees(employees);
    }, [employees]);

    const showAddView = () => {
        navigation.navigate("Add", {
            add: add
        })
    }

    const showUpdateView = () => {
        navigation.navigate("Update", {
            item:selectedEmployee,
            update: update
        })
    }

    const add = async (employee) => {
        employee.id = 0
        const employees = await EmployeeService.create(employee)
        setEmployees(employees)
        setViewEmployees(employees);
    }

    const update = async (employee) => {
        const employees = await EmployeeService.update(employee)
        setEmployees(employees)
        setViewEmployees(employees);
    }

    const remove = async () => {
        const employees = await EmployeeService.delete({id: selectedEmployee.id})
        setEmployees(employees)
        setViewEmployees(employees)
        setVisibleDeleteDialog(false)
    }

    const showWorkDialog = () => {
        setVisibleWorkDialog(!visibleWorkDialog)
    }

    const showPostDialog = () => {
        setVisiblePostDialog(!visiblePostDialog)
    }

    const showDeleteDialog = () => {
        setVisibleDeleteDialog(!visibleDeleteDialog)
    }



    const getEngineers = () => {
        const engineers = EmployeeService.getByPost(post)
        setViewEmployees(engineers)
        setVisiblePostDialog(false)
    }

    const toggleMap = () => {
        setShowMap(!showMap);
    };

    const getUnfired = () => {
        const unfired = EmployeeService.getByPeriod(dayNumber)

        setViewEmployees(unfired)
        setVisibleWorkDialog(false)
    }

    return (
        <Swiper showsButtons={false}>
        {
            showMap? (
               <Map/>
                           ) :
                        <Swiper showsButtons={false}>
                            <View style={styles.container}>

                                <DialogPost visible={visiblePostDialog}
                                            handleShow={getEngineers}
                                            handleCancel={showPostDialog}
                                            post={post}
                                            setPost={setPost}/>
                                <DialogWork visible={visibleWorkDialog}
                                            handleShow={getUnfired}
                                            handleCancel={showWorkDialog}
                                            dayNumber={dayNumber}
                                            setDayNumber={setDayNumber}/>
                                <DialogDelete visible={visibleDeleteDialog}
                                              handleDelete={remove}
                                              handleCancel={showDeleteDialog}/>
                                <DropMenu add={showAddView}
                                          getEngineers={showPostDialog}
                                          remove={showDeleteDialog}
                                          update={showUpdateView}
                                          getUnfired={showWorkDialog}
                                          map={toggleMap}
                                          style={styles.menu}
                                />
                                <ThemeSwitch/>
                                <FlatList
                                    data={viewEmployees}
                                    renderItem={({item}) => (
                                        <TouchableOpacity onPress={() => setSelectedEmployee(item)}>
                                            <Text style={styles.buttonText}>{item.lastName} {item.post}</Text>
                                        </TouchableOpacity>
                                    )}
                                    style={styles.flexcontainer}
                                />

                            </View>
                            <View style={styles.container}>
                                <Text style={styles.buttonText}>{selectedEmployee.firstName} {selectedEmployee.lastName}</Text>
                                <Text style={styles.buttonText}>Position: {selectedEmployee.post}</Text>
                                <Text style={styles.buttonText}>Position: {selectedEmployee.dateOfEmployment}</Text>
                                <Text style={styles.buttonText}>Position: {selectedEmployee.dateOfFire}</Text>
                            </View>
                        </Swiper>
                    }
        </Swiper>
    );
}


