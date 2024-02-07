import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { IoIosArrowDown, IoIosClose, IoIosArrowUp } from "react-icons/io";
import {
  PiSlidersHorizontalFill,
  PiGridFourFill,
  PiListDashesFill,
} from "react-icons/pi";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import screen from "../assets/img/location/screen1.png";
import location from "../assets/img/location/location.png";
import Screen_Info from "../components/Screen_Info";

const mockup = [
  {
    id: 1,
    name: "Screen 1",
    location: "Central World,FL1",
    province: "Bangkok",
    resolutions: "1920x1080",
    status: 1,
    img: screen,
    latitudeImg: location,
    latitude: [13.746876513371383, 100.53902742618709],
    officeHours: ["10.00", "22.00"],
    rule: "Media Rule 1",
    detailed: "4K",
    direction: "Portrait",
    position: "Indoor",
    slotPerDay: 10,
    loopDuration: 15,
    tag: [
      "Portrait",
      "North",
      "Fashion",
      "Beauty",
      "Flagship",
      "Jean",
      "Indoor",
      "4K",
      "1920x1080",
      "1000MB",
    ],
    schedule: [
      {
        date: new Date(2023, 5, 21, 0, 0, 0, 0),
        slot: 10,
        booking: 9,
        mediaSchedule: [
          {
            id: "1",
            name: "Mid year sale 2023.mp4",
            merchandise: "Nike",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "2",
            name: "Promotion Summer.mp4",
            merchandise: "Adidas",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "3",
            name: "Sample Ads.png",
            merchandise: "Adidas 3",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "4",
            name: "Mid Night Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "5",
            name: "Mid Night Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "6",
            name: "Mid year Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "7",
            name: "Mid year Sale 2023.mp4",
            merchandise: "BAOBAO",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "8",
            name: "Food Hall Ads.mp4",
            merchandise: "After You",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "9",
            name: "Mid year sale 2023.mp4",
            merchandise: "Adidas",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "10",
            name: "Pet Show 2023.mp4",
            merchandise: "Tops",
            screen: "Screen 1",
            duration: 15,
          },
        ],
      },
      {
        date: new Date(2023, 5, 22, 0, 0, 0, 0),
        slot: 10,
        booking: 7,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 23, 0, 0, 0, 0),
        slot: 10,
        booking: 4,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 24, 0, 0, 0, 0),
        slot: 10,
        booking: 1,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 25, 0, 0, 0, 0),
        slot: 10,
        booking: 5,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 26, 0, 0, 0, 0),
        slot: 10,
        booking: 7,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 27, 0, 0, 0, 0),
        slot: 10,
        booking: 10,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 28, 0, 0, 0, 0),
        slot: 10,
        booking: 10,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 29, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 30, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 6, 1, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 6, 2, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
    ],
    health: [
      80, 80, 80, 80, 80, 80, 80, 80, 40, 40, 80, 80, 80, 80, 80, 80, 80, 80,
      80, 80, 40, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80,
      40, 80, 80, 80, 80, 80, 80, 40, 80, 40, 80, 80,
    ],
    uptime: 94,
    maintenanceNoti: true,
    offlineNotification: "Second",
    price: 500,
  },
  {
    id: 2,
    name: "Screen 2",
    location: "Central World,FL1",
    province: "Bangkok",
    resolutions: "1920x1080",
    status: 1,
    img: screen,
    latitudeImg: location,
    latitude: [13.746876513371383, 100.53902742618709],
    officeHours: ["10.00", "22.00"],
    rule: "Media Rule 1",
    detailed: "4K",
    direction: "Portrait",
    position: "Indoor",
    slotPerDay: 15,
    loopDuration: 15,
    tag: ["Portrait", "North", "Fashion"],
    schedule: [
      {
        date: new Date(2023, 5, 21, 0, 0, 0, 0),
        slot: 10,
        booking: 9,
        mediaSchedule: [
          {
            id: "1",
            name: "Mid year sale 2023.mp4",
            merchandise: "Nike",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "2",
            name: "Promotion Summer.mp4",
            merchandise: "Adidas",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "3",
            name: "Sample Ads.png",
            merchandise: "Adidas 3",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "4",
            name: "Mid Night Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "5",
            name: "Mid Night Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "6",
            name: "Mid year Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "7",
            name: "Mid year Sale 2023.mp4",
            merchandise: "BAOBAO",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "8",
            name: "Food Hall Ads.mp4",
            merchandise: "After You",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "9",
            name: "Mid year sale 2023.mp4",
            merchandise: "Adidas",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "10",
            name: "Pet Show 2023.mp4",
            merchandise: "Tops",
            screen: "Screen 1",
            duration: 15,
          },
        ],
      },
      {
        date: new Date(2023, 5, 22, 0, 0, 0, 0),
        slot: 10,
        booking: 7,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 23, 0, 0, 0, 0),
        slot: 10,
        booking: 4,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 24, 0, 0, 0, 0),
        slot: 10,
        booking: 1,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 25, 0, 0, 0, 0),
        slot: 10,
        booking: 5,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 26, 0, 0, 0, 0),
        slot: 10,
        booking: 7,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 27, 0, 0, 0, 0),
        slot: 10,
        booking: 10,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 28, 0, 0, 0, 0),
        slot: 10,
        booking: 10,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 29, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 30, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 6, 1, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 6, 2, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
    ],
    health: [
      80, 80, 80, 80, 80, 80, 80, 80, 40, 40, 80, 80, 80, 80, 80, 80, 80, 80,
      80, 80, 40, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80,
      40, 80, 80, 80, 80, 80, 80, 40, 80, 40, 80, 80,
    ],
    uptime: 94,
    maintenanceNoti: true,
    offlineNotification: "Second",
    price: 500,
  },
  {
    id: 3,
    name: "Screen 3",
    location: "Central World,FL1",
    province: "Bangkok",
    resolutions: "1080x1920",
    status: 1,
    img: screen,
    latitudeImg: location,
    latitude: [13.746876513371383, 100.53902742618709],
    officeHours: ["10.00", "22.00"],
    rule: "Media Rule 1",
    detailed: "4K",
    direction: "Portrait",
    position: "Indoor",
    slotPerDay: 20,
    loopDuration: 15,
    tag: [
      "Portrait",
      "North",
      "Fashion",
      "Beauty",
      "Flagship",
      "Jean",
      "Indoor",
      "4K",
    ],
    schedule: [
      {
        date: new Date(2023, 5, 21, 0, 0, 0, 0),
        slot: 10,
        booking: 9,
        mediaSchedule: [
          {
            id: "1",
            name: "Mid year sale 2023.mp4",
            merchandise: "Nike",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "2",
            name: "Promotion Summer.mp4",
            merchandise: "Adidas",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "3",
            name: "Sample Ads.png",
            merchandise: "Adidas 3",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "4",
            name: "Mid Night Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "5",
            name: "Mid Night Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "6",
            name: "Mid year Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "7",
            name: "Mid year Sale 2023.mp4",
            merchandise: "BAOBAO",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "8",
            name: "Food Hall Ads.mp4",
            merchandise: "After You",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "9",
            name: "Mid year sale 2023.mp4",
            merchandise: "Adidas",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "10",
            name: "Pet Show 2023.mp4",
            merchandise: "Tops",
            screen: "Screen 1",
            duration: 15,
          },
        ],
      },
      {
        date: new Date(2023, 5, 22, 0, 0, 0, 0),
        slot: 10,
        booking: 7,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 23, 0, 0, 0, 0),
        slot: 10,
        booking: 4,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 24, 0, 0, 0, 0),
        slot: 10,
        booking: 1,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 25, 0, 0, 0, 0),
        slot: 10,
        booking: 5,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 26, 0, 0, 0, 0),
        slot: 10,
        booking: 7,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 27, 0, 0, 0, 0),
        slot: 10,
        booking: 10,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 28, 0, 0, 0, 0),
        slot: 10,
        booking: 10,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 29, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 30, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 6, 1, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 6, 2, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
    ],
    health: [
      80, 80, 80, 80, 80, 80, 80, 80, 40, 40, 80, 80, 80, 80, 80, 80, 80, 80,
      80, 80, 40, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80,
      40, 80, 80, 80, 80, 80, 80, 40, 80, 40, 80, 80,
    ],
    uptime: 94,
    maintenanceNoti: true,
    offlineNotification: "Second",
  },
  {
    id: 4,
    name: "Screen 4",
    location: "Central World,FL1",
    province: "Bangkok",
    resolutions: "1080x1920",
    status: 1,
    img: screen,
    latitudeImg: location,
    latitude: [13.746876513371383, 100.53902742618709],
    officeHours: ["10.00", "22.00"],
    rule: "Media Rule 1",
    detailed: "4K",
    direction: "Portrait",
    position: "Indoor",
    slotPerDay: 20,
    loopDuration: 15,
    tag: [
      "Portrait",
      "North",
      "Fashion",
      "Beauty",
      "Flagship",
      "Jean",
      "Indoor",
      "4K",
    ],
    schedule: [
      {
        date: new Date(2023, 5, 21, 0, 0, 0, 0),
        slot: 10,
        booking: 9,
        mediaSchedule: [
          {
            id: "1",
            name: "Mid year sale 2023.mp4",
            merchandise: "Nike",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "2",
            name: "Promotion Summer.mp4",
            merchandise: "Adidas",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "3",
            name: "Sample Ads.png",
            merchandise: "Adidas 3",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "4",
            name: "Mid Night Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "5",
            name: "Mid Night Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "6",
            name: "Mid year Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "7",
            name: "Mid year Sale 2023.mp4",
            merchandise: "BAOBAO",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "8",
            name: "Food Hall Ads.mp4",
            merchandise: "After You",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "9",
            name: "Mid year sale 2023.mp4",
            merchandise: "Adidas",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "10",
            name: "Pet Show 2023.mp4",
            merchandise: "Tops",
            screen: "Screen 1",
            duration: 15,
          },
        ],
      },
      {
        date: new Date(2023, 5, 22, 0, 0, 0, 0),
        slot: 10,
        booking: 7,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 23, 0, 0, 0, 0),
        slot: 10,
        booking: 4,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 24, 0, 0, 0, 0),
        slot: 10,
        booking: 1,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 25, 0, 0, 0, 0),
        slot: 10,
        booking: 5,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 26, 0, 0, 0, 0),
        slot: 10,
        booking: 7,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 27, 0, 0, 0, 0),
        slot: 10,
        booking: 10,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 28, 0, 0, 0, 0),
        slot: 10,
        booking: 10,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 29, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 30, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 6, 1, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 6, 2, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
    ],
    health: [
      80, 80, 80, 80, 80, 80, 80, 80, 40, 40, 80, 80, 80, 80, 80, 80, 80, 80,
      80, 80, 40, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80,
      40, 80, 80, 80, 80, 80, 80, 40, 80, 40, 80, 80,
    ],
    uptime: 94,
    maintenanceNoti: true,
    offlineNotification: "Second",
    price: 500,
  },
  {
    id: 5,
    name: "Screen 5",
    location: "Central World,FL1",
    province: "Bangkok",
    resolutions: "1920x1080",
    status: 1,
    img: screen,
    latitudeImg: location,
    latitude: [13.746876513371383, 100.53902742618709],
    officeHours: ["10.00", "22.00"],
    rule: "Media Rule 1",
    detailed: "4K",
    direction: "Portrait",
    position: "Indoor",
    slotPerDay: 10,
    loopDuration: 15,
    tag: ["Portrait", "North", "Fashion", "Beauty"],
    schedule: [
      {
        date: new Date(2023, 5, 21, 0, 0, 0, 0),
        slot: 10,
        booking: 9,
        mediaSchedule: [
          {
            id: "1",
            name: "Mid year sale 2023.mp4",
            merchandise: "Nike",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "2",
            name: "Promotion Summer.mp4",
            merchandise: "Adidas",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "3",
            name: "Sample Ads.png",
            merchandise: "Adidas 3",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "4",
            name: "Mid Night Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "5",
            name: "Mid Night Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "6",
            name: "Mid year Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "7",
            name: "Mid year Sale 2023.mp4",
            merchandise: "BAOBAO",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "8",
            name: "Food Hall Ads.mp4",
            merchandise: "After You",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "9",
            name: "Mid year sale 2023.mp4",
            merchandise: "Adidas",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "10",
            name: "Pet Show 2023.mp4",
            merchandise: "Tops",
            screen: "Screen 1",
            duration: 15,
          },
        ],
      },
      {
        date: new Date(2023, 5, 22, 0, 0, 0, 0),
        slot: 10,
        booking: 7,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 23, 0, 0, 0, 0),
        slot: 10,
        booking: 4,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 24, 0, 0, 0, 0),
        slot: 10,
        booking: 1,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 25, 0, 0, 0, 0),
        slot: 10,
        booking: 5,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 26, 0, 0, 0, 0),
        slot: 10,
        booking: 7,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 27, 0, 0, 0, 0),
        slot: 10,
        booking: 10,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 28, 0, 0, 0, 0),
        slot: 10,
        booking: 10,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 29, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 30, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 6, 1, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 6, 2, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
    ],
    health: [
      80, 80, 80, 80, 80, 80, 80, 80, 40, 40, 80, 80, 80, 80, 80, 80, 80, 80,
      80, 80, 40, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80,
      40, 80, 80, 80, 80, 80, 80, 40, 80, 40, 80, 80,
    ],
    uptime: 94,
    maintenanceNoti: true,
    offlineNotification: "Second",
    price: 500,
  },
  {
    id: 6,
    name: "Screen 6",
    location: "Central World,FL1",
    province: "Bangkok",
    resolutions: "1080x1920",
    status: 1,
    img: screen,
    latitudeImg: location,
    latitude: [13.746876513371383, 100.53902742618709],
    officeHours: ["10.00", "22.00"],
    rule: "Media Rule 1",
    detailed: "4K",
    direction: "Portrait",
    position: "Indoor",
    slotPerDay: 15,
    loopDuration: 15,
    tag: [
      "Portrait",
      "North",
      "Fashion",
      "Beauty",
      "Flagship",
      "Jean",
      "Indoor",
      "4K",
    ],
    schedule: [
      {
        date: new Date(2023, 5, 21, 0, 0, 0, 0),
        slot: 10,
        booking: 9,
        mediaSchedule: [
          {
            id: "1",
            name: "Mid year sale 2023.mp4",
            merchandise: "Nike",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "2",
            name: "Promotion Summer.mp4",
            merchandise: "Adidas",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "3",
            name: "Sample Ads.png",
            merchandise: "Adidas 3",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "4",
            name: "Mid Night Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "5",
            name: "Mid Night Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "6",
            name: "Mid year Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "7",
            name: "Mid year Sale 2023.mp4",
            merchandise: "BAOBAO",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "8",
            name: "Food Hall Ads.mp4",
            merchandise: "After You",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "9",
            name: "Mid year sale 2023.mp4",
            merchandise: "Adidas",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "10",
            name: "Pet Show 2023.mp4",
            merchandise: "Tops",
            screen: "Screen 1",
            duration: 15,
          },
        ],
      },
      {
        date: new Date(2023, 5, 22, 0, 0, 0, 0),
        slot: 10,
        booking: 7,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 23, 0, 0, 0, 0),
        slot: 10,
        booking: 4,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 24, 0, 0, 0, 0),
        slot: 10,
        booking: 1,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 25, 0, 0, 0, 0),
        slot: 10,
        booking: 5,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 26, 0, 0, 0, 0),
        slot: 10,
        booking: 7,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 27, 0, 0, 0, 0),
        slot: 10,
        booking: 10,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 28, 0, 0, 0, 0),
        slot: 10,
        booking: 10,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 29, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 30, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 6, 1, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 6, 2, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
    ],
    health: [
      80, 80, 80, 80, 80, 80, 80, 80, 40, 40, 80, 80, 80, 80, 80, 80, 80, 80,
      80, 80, 40, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80,
      40, 80, 80, 80, 80, 80, 80, 40, 80, 40, 80, 80,
    ],
    uptime: 94,
    maintenanceNoti: true,
    offlineNotification: "Second",
    price: 500,
  },
  {
    id: 7,
    name: "Screen 7",
    location: "Central World,FL1",
    province: "Bangkok",
    resolutions: "1920x1080",
    status: 1,
    img: screen,
    latitudeImg: location,
    latitude: [13.746876513371383, 100.53902742618709],
    officeHours: ["10.00", "22.00"],
    rule: "Media Rule 1",
    detailed: "4K",
    direction: "Portrait",
    position: "Indoor",
    slotPerDay: 20,
    loopDuration: 15,
    tag: ["Portrait", "North", "Fashion", "Beauty", "Flagship"],
    schedule: [
      {
        date: new Date(2023, 5, 21, 0, 0, 0, 0),
        slot: 10,
        booking: 9,
        mediaSchedule: [
          {
            id: "1",
            name: "Mid year sale 2023.mp4",
            merchandise: "Nike",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "2",
            name: "Promotion Summer.mp4",
            merchandise: "Adidas",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "3",
            name: "Sample Ads.png",
            merchandise: "Adidas 3",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "4",
            name: "Mid Night Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "5",
            name: "Mid Night Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "6",
            name: "Mid year Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "7",
            name: "Mid year Sale 2023.mp4",
            merchandise: "BAOBAO",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "8",
            name: "Food Hall Ads.mp4",
            merchandise: "After You",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "9",
            name: "Mid year sale 2023.mp4",
            merchandise: "Adidas",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "10",
            name: "Pet Show 2023.mp4",
            merchandise: "Tops",
            screen: "Screen 1",
            duration: 15,
          },
        ],
      },
      {
        date: new Date(2023, 5, 22, 0, 0, 0, 0),
        slot: 10,
        booking: 7,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 23, 0, 0, 0, 0),
        slot: 10,
        booking: 4,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 24, 0, 0, 0, 0),
        slot: 10,
        booking: 1,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 25, 0, 0, 0, 0),
        slot: 10,
        booking: 5,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 26, 0, 0, 0, 0),
        slot: 10,
        booking: 7,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 27, 0, 0, 0, 0),
        slot: 10,
        booking: 10,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 28, 0, 0, 0, 0),
        slot: 10,
        booking: 10,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 29, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 30, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 6, 1, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 6, 2, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
    ],
    health: [
      80, 80, 80, 80, 80, 80, 80, 80, 40, 40, 80, 80, 80, 80, 80, 80, 80, 80,
      80, 80, 40, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80,
      40, 80, 80, 80, 80, 80, 80, 40, 80, 40, 80, 80,
    ],
    uptime: 94,
    maintenanceNoti: true,
    offlineNotification: "Second",
    price: 500,
  },
  {
    id: 8,
    name: "Screen 8",
    location: "Central World,FL1",
    province: "Bangkok",
    resolutions: "1920x1080",
    status: 1,
    img: screen,
    latitudeImg: location,
    latitude: [13.746876513371383, 100.53902742618709],
    officeHours: ["10.00", "22.00"],
    rule: "Media Rule 1",
    detailed: "4K",
    direction: "Portrait",
    position: "Indoor",
    slotPerDay: 20,
    loopDuration: 15,
    tag: [
      "Portrait",
      "North",
      "Fashion",
      "Beauty",
      "Flagship",
      "Jean",
      "Indoor",
      "4K",
      "1920x1080",
      "1000MB",
    ],
    schedule: [
      {
        date: new Date(2023, 5, 21, 0, 0, 0, 0),
        slot: 10,
        booking: 9,
        mediaSchedule: [
          {
            id: "1",
            name: "Mid year sale 2023.mp4",
            merchandise: "Nike",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "2",
            name: "Promotion Summer.mp4",
            merchandise: "Adidas",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "3",
            name: "Sample Ads.png",
            merchandise: "Adidas 3",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "4",
            name: "Mid Night Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "5",
            name: "Mid Night Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "6",
            name: "Mid year Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "7",
            name: "Mid year Sale 2023.mp4",
            merchandise: "BAOBAO",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "8",
            name: "Food Hall Ads.mp4",
            merchandise: "After You",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "9",
            name: "Mid year sale 2023.mp4",
            merchandise: "Adidas",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "10",
            name: "Pet Show 2023.mp4",
            merchandise: "Tops",
            screen: "Screen 1",
            duration: 15,
          },
        ],
      },
      {
        date: new Date(2023, 5, 22, 0, 0, 0, 0),
        slot: 10,
        booking: 7,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 23, 0, 0, 0, 0),
        slot: 10,
        booking: 4,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 24, 0, 0, 0, 0),
        slot: 10,
        booking: 1,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 25, 0, 0, 0, 0),
        slot: 10,
        booking: 5,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 26, 0, 0, 0, 0),
        slot: 10,
        booking: 7,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 27, 0, 0, 0, 0),
        slot: 10,
        booking: 10,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 28, 0, 0, 0, 0),
        slot: 10,
        booking: 10,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 29, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 30, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 6, 1, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 6, 2, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
    ],
    health: [
      80, 80, 80, 80, 80, 80, 80, 80, 40, 40, 80, 80, 80, 80, 80, 80, 80, 80,
      80, 80, 40, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80,
      40, 80, 80, 80, 80, 80, 80, 40, 80, 40, 80, 80,
    ],
    uptime: 94,
    maintenanceNoti: true,
    offlineNotification: "Second",
    price: 500,
  },
  {
    id: 9,
    name: "Screen 9",
    location: "Central World,FL1",
    province: "Bangkok",
    resolutions: "1080x1920",
    status: 1,
    img: screen,
    latitudeImg: location,
    latitude: [13.746876513371383, 100.53902742618709],
    officeHours: ["10.00", "22.00"],
    rule: "Media Rule 1",
    detailed: "4K",
    direction: "Portrait",
    position: "Indoor",
    slotPerDay: 20,
    loopDuration: 15,
    tag: ["Portrait", "North", "Fashion"],
    schedule: [
      {
        date: new Date(2023, 5, 21, 0, 0, 0, 0),
        slot: 10,
        booking: 9,
        mediaSchedule: [
          {
            id: "1",
            name: "Mid year sale 2023.mp4",
            merchandise: "Nike",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "2",
            name: "Promotion Summer.mp4",
            merchandise: "Adidas",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "3",
            name: "Sample Ads.png",
            merchandise: "Adidas 3",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "4",
            name: "Mid Night Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "5",
            name: "Mid Night Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "6",
            name: "Mid year Sale 2023.mp4",
            merchandise: "FILA",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "7",
            name: "Mid year Sale 2023.mp4",
            merchandise: "BAOBAO",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "8",
            name: "Food Hall Ads.mp4",
            merchandise: "After You",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "9",
            name: "Mid year sale 2023.mp4",
            merchandise: "Adidas",
            screen: "Screen 1",
            duration: 15,
          },
          {
            id: "10",
            name: "Pet Show 2023.mp4",
            merchandise: "Tops",
            screen: "Screen 1",
            duration: 15,
          },
        ],
      },
      {
        date: new Date(2023, 5, 22, 0, 0, 0, 0),
        slot: 10,
        booking: 7,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 23, 0, 0, 0, 0),
        slot: 10,
        booking: 4,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 24, 0, 0, 0, 0),
        slot: 10,
        booking: 1,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 25, 0, 0, 0, 0),
        slot: 10,
        booking: 5,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 26, 0, 0, 0, 0),
        slot: 10,
        booking: 7,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 27, 0, 0, 0, 0),
        slot: 10,
        booking: 10,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 28, 0, 0, 0, 0),
        slot: 10,
        booking: 10,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 29, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 5, 30, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 6, 1, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
      {
        date: new Date(2023, 6, 2, 0, 0, 0, 0),
        slot: 10,
        booking: 0,
        mediaSchedule: [],
      },
    ],
    health: [
      80, 80, 80, 80, 80, 80, 80, 80, 40, 40, 80, 80, 80, 80, 80, 80, 80, 80,
      80, 80, 40, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80,
      40, 80, 80, 80, 80, 80, 80, 40, 80, 40, 80, 80,
    ],
    uptime: 94,
    maintenanceNoti: true,
    offlineNotification: "Second",
    price: 500,
  },
];

const Event = () => {
  const [showRightPanel, setShowRightPanel] = useState(false);

  const [isSectorOpen, setIsSectorOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isClustorOpen, setIsClustorOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);

  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedScreenItems, setSelectedScreenItems] = useState([]);

  const [selectInfoScreen, setSelectInfoScren] = useState([]);
  const [openInfoScreenModal, setOpenInfoScreenModal] = useState(false);

  const [filter, setFilter] = useState([
    "Flagship",
    "5 Floor",
    "Beauty",
    "Portrait",
  ]);

  const toggleSectorSelect = () => {
    setIsSectorOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleRegionSelect = () => {
    setIsRegionOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleClustorSelect = () => {
    setIsClustorOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleBranchSelect = () => {
    setIsBranchOpen((prevIsOpen) => !prevIsOpen);
  };
  const toggleDepartmentSelect = () => {
    setIsDepartmentOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "0") {
      alert("Please select a valid status.");
    } else {
      setFilter((prevFilter) => {
        if (prevFilter.includes(selectedValue)) {
          return prevFilter; // Already selected, no change
        } else {
          return [...prevFilter, selectedValue]; // Add the selected value to the filter state
        }
      });
    }
  };

  const removeFilter = (event) => {
    const selectedValue = event;
    const updatedFilter = filter.filter((value) => value !== selectedValue);
    setFilter(updatedFilter);
  };

  const clearFilter = () => {
    setFilter([]);
  };

  const showAllFilter = () => {
    setShowRightPanel(!showRightPanel);
  };

  const toggleAllCheckboxes = () => {
    const newCheckboxes = {};
    const newSelectAll = !selectAll;

    // Set all checkboxes to the new state
    mockup.forEach((row) => {
      newCheckboxes[row.id] = newSelectAll;
    });

    setCheckboxes(newCheckboxes);
    setSelectAll(newSelectAll);

    // Do something with the checkedRowIds array (e.g., store it in state)
    const checkedRowIds = newSelectAll ? mockup.map((row) => row.id) : [];
    setSelectedScreenItems(checkedRowIds);
  };

  const toggleCheckboxAddScreen = (rowId) => {
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = {
        ...prevCheckboxes,
        [rowId]: !prevCheckboxes[rowId],
      };

      const checkedRowIds = Object.keys(updatedCheckboxes).filter(
        (id) => updatedCheckboxes[id]
      );

      const intArray = checkedRowIds.map((str) => parseInt(str, 10));
      setSelectedScreenItems(intArray);

      return updatedCheckboxes;
    });
  };

  const handleSelectInfoScreen = (screen) => {
    setSelectInfoScren(screen);
    setOpenInfoScreenModal(!openInfoScreenModal);
  };

  return (
    <>
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div className="flex justify-between mt-10 mb-5 font-bold text-2xl font-poppins">
          <div className="flex items-center">
            <div className="font-poppins">Screens</div>
          </div>
          <button className="bg-[#6425FE]  hover:bg-[#3b1694] text-white text-sm font-poppins w-[180px] h-[45px] rounded-md">
            New Screen +
          </button>
        </div>

        <div className="relative flex flex-col min-w-0  w-full mb-6 ">
          {/* Select Menu */}
          <div class="rounded-lg h-[50px] flex items-center shadow-md">
            <div class="flex flex-col lg:flex-row">
              <div class="w-full lg:w-3/4 flex justify-center items-center">
                <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <select
                    name="sector"
                    id="sector"
                    onClick={toggleSectorSelect}
                    onChange={handleStatusChange}
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Sector">Sector</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Landscape">Landscape</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {isSectorOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
                <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <select
                    name="region"
                    id="region"
                    onClick={toggleRegionSelect}
                    onChange={handleStatusChange}
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Region">Region</option>
                    <option value="North">North</option>
                    <option value="West">West</option>
                    <option value="East">East</option>
                    <option value="South">South</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                    {isRegionOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
                <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <select
                    name="store_cluster"
                    id="store_cluster"
                    onClick={toggleClustorSelect}
                    onChange={handleStatusChange}
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Store Cluster">Store Cluster</option>
                    <option value="...">...</option>
                    <option value="...">...</option>
                    <option value="...">...</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {isClustorOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
                <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <select
                    name="branch"
                    id="branch"
                    onClick={toggleBranchSelect}
                    onChange={handleStatusChange}
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Branch">Branch</option>
                    <option value="...">...</option>
                    <option value="...">...</option>
                    <option value="...">...</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {isBranchOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
                <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <select
                    name="department"
                    id="department"
                    onClick={toggleDepartmentSelect}
                    onChange={handleStatusChange}
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    <option value="Department">Department</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Toy">Toy</option>
                    <option value="Electronics">Electronics</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {isDepartmentOpen ? (
                      <IoIosArrowUp size={18} color="#6425FE" />
                    ) : (
                      <IoIosArrowDown size={18} color="#6425FE" />
                    )}
                  </div>
                </div>
                <div class="relative w-full lg:w-[230px] h-[40px] flex  justify-center font-bold text-sm lg:text-base ml-3 font-poppins">
                  <button
                    onClick={() => showAllFilter()}
                    name="role"
                    class="block appearance-none w-full bg-[#f2f2f2] text-sm text-left border border-gray-200 rounded p-1 pr-6 focus:outline-none focus:border-gray-400 focus:ring focus:ring-gray-200"
                  >
                    All filter
                  </button>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <PiSlidersHorizontalFill size={18} color="#6425FE" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter  */}
          <div class="flex flex-row mt-4">
            <div class="basis-11/12">
              {filter &&
                filter.map((items) => (
                  <button onClick={() => removeFilter(items)}>
                    <div className="w-[100px] lg:w-[130px] h-[40px] ml-3 border border-gray-300 rounded-full">
                      <div className="grid grid-cols-4">
                        <div className="col-span-1 mt-[6px]">
                          <div className="flex justify-end items-center">
                            <IoIosClose size="27" color="#6425FE" />
                          </div>
                        </div>
                        <div className="col-span-3 mt-[8px]">
                          <div className="flex justify-center items-center">
                            <div className="font-poppins text-sm">{items}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              {filter.length > 0 && (
                <button onClick={() => clearFilter()}>
                  <div className="w-[100px] lg:w-[130px] h-[40px] ml-3 border bg-[#6425FE]  hover:bg-[#3b1694] border-gray-300 rounded-full">
                    <div className="grid grid-cols-12">
                      <div className="col-span-1 mt-[6px]">
                        <div className="flex justify-end items-center">
                          <IoIosClose size="27" color="#6425FE" />
                        </div>
                      </div>
                      <div className="col-span-11 mt-[8px]">
                        <div className="flex justify-center items-center">
                          <div className="font-poppins text-sm text-white">
                            Clear All
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              )}
            </div>
            {/* <div class="basis-1/12">
              <div className="flex flex-row">
                {view ? (
                  <div className="flex basis-1/2 justify-end align-middle">
                    <button onClick={() => handleView()}>
                      <PiListDashesFill size={42} color="#6425FE" />
                    </button>
                  </div>
                ) : (
                  <div className="flex basis-1/2 justify-end align-middle">
                    <button onClick={() => handleView()}>
                      <PiGridFourFill size={42} color="#6425FE" />
                    </button>
                  </div>
                )}
              </div>
            </div> */}
          </div>
        </div>

        <div className="mt-5">
          <div className="w-auto h-[580px] overflow-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="px-3 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                    <label className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute h-5 w-5 cursor-pointer"
                        checked={selectAll}
                        onChange={toggleAllCheckboxes}
                      />
                      <span
                        className={`h-5 w-5 border-2 border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                          selectAll ? "bg-white" : ""
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-6 w-6 text-white ${
                            selectAll ? "opacity-100" : "opacity-0"
                          } transition-opacity duration-300 ease-in-out`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="#6425FE"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    </label>
                  </th>
                  <th className="px-1 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-medium text-[#59606C] tracking-wider">
                    No
                  </th>
                  <th className="px-2 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-medium text-[#59606C] tracking-wider">
                    Screen Name
                  </th>
                  <th className="px-4 py-4 border-b border-gray-300 text-left leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                    Media Rule
                  </th>
                  <th className="px-1 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                    Slot Per Day
                  </th>
                  <th className="px-1 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                    Loop Duration
                  </th>
                  <th className="px-4 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                    Tag
                  </th>
                  <th className="px-6 py-4 border-b border-gray-300 text-center leading-4 text-lg font-poppins font-normal text-[#59606C] tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockup.map((row, key) => (
                  <tr key={row.id}>
                    <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        <label className="inline-flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="opacity-0 absolute h-5 w-5 cursor-pointer"
                            checked={checkboxes[row.id] || false} // Set default value to false if row.id is not present
                            onChange={() => toggleCheckboxAddScreen(row.id)}
                          />
                          <span
                            className={`h-5 w-5 border-2 border-[#6425FE] rounded-sm cursor-pointer flex items-center justify-center ${
                              checkboxes[row.id] ? "bg-white" : ""
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-6 w-6 text-white ${
                                checkboxes[row.id] ? "opacity-100" : "opacity-0"
                              } transition-opacity duration-300 ease-in-out`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="#6425FE"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                        </label>
                      </div>
                    </td>
                    <td className="px-1 py-4 whitespace-no-wrap border-b  border-gray-200">
                      <div className="flex">
                        <div className="font-poppins text-xl font-bold">
                          {row.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-4 whitespace-no-wrap border-b  border-gray-200">
                      <div className="flex">
                        <div
                          onClick={() => handleSelectInfoScreen(row)}
                          className="font-poppins text-xl font-bold cursor-pointer"
                        >
                          {row.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-no-wrap border-b  border-gray-200">
                      <div className="font-poppins text-sm text-[#59606C] font-bold">
                        {row.location}
                      </div>
                      <div className="font-poppins text-sm font-bold">
                        {row.province}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-200">
                      <div className="font-poppins font-bold">
                        {row.resolutions}
                      </div>
                    </td>
                    <td className="px-1 py-4 whitespace-no-wrap border-b text-center  border-gray-200">
                      <div className="font-poppins font-bold border border-[#DBDBDB] rounded-lg">
                        {row.slotPerDay}
                      </div>
                    </td>
                    <td className="px-1 py-4 whitespace-no-wrap border-b text-center  border-gray-200">
                      <div className="font-poppins font-bold border border-[#DBDBDB] rounded-lg">
                        {row.loopDuration}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex flex-wrap">
                        {row.tag.map((items, index) => (
                          <div
                            key={index}
                            className="border border-gray-300 rounded-lg flex justify-center items-center mb-1 mr-1"
                            style={{ flexBasis: "calc(20% - 8px)" }} // Adjust the width to fit 5 items per row
                          >
                            <div className="font-poppins text-xs font-bold">
                              {items}
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-no-wrap border-b  border-gray-200">
                      <div className="space-x-2">
                        <button onClick={() => alert(`edit : ${row.id}`)}>
                          <RiEditLine size={20} className="text-[#6425FE]" />
                        </button>
                        <button onClick={() => alert(`delete : ${row.id}`)}>
                          <RiDeleteBin5Line
                            size={20}
                            className="text-[#6425FE]"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {openInfoScreenModal && (
        <a
          onClick={() => setOpenInfoScreenModal(!openInfoScreenModal)}
          className="fixed top-0 w-screen left-[0px] h-screen opacity-80 bg-black z-10 backdrop-blur"
        />
      )}

      {openInfoScreenModal && (
        <Screen_Info
          setOpenInfoScreenModal={setOpenInfoScreenModal}
          selectInfoScreen={selectInfoScreen}
        />
      )}
    </>
  );
};

export default Event;
