import {
  BsBatteryCharging,
  BsDeviceHdd,
  BsDeviceSsd,
  BsDisplay,
  BsDisplayport,
  BsFillCpuFill,
  BsFillNvmeFill,
  BsFillUsbPlugFill,
  BsGpuCard,
  BsHdmi,
  BsHeadphones,
  BsKeyboard,
  BsLayersHalf,
  BsMotherboard,
  BsMouse,
  BsMouse2Fill,
  BsPc,
  BsRadar,
  BsUsbC,
} from "react-icons/bs";
import { FaLaptop, FaMemory } from "react-icons/fa6";
import { HiMiniBattery50 } from "react-icons/hi2";
import { FaKeyboard } from "react-icons/fa";
import { MdOutlineScreenshotMonitor } from "react-icons/md";

export const iconsSpec = {
  CPU: BsFillCpuFill,
  RAM: FaMemory,
  SSD: BsDeviceSsd,
  HDD: BsDeviceHdd,
  NVME: BsFillNvmeFill,
  BATTERY: HiMiniBattery50,
  BATTERYCHARGING: BsBatteryCharging,
  KEYBOARD: FaKeyboard,
  DISPLAY: BsDisplay,
  DISPLAYPORT: BsDisplayport,
  HDMI: BsHdmi,
  GPU: BsGpuCard,
  LAYER: BsLayersHalf,
  MOTHERBOARD: BsMotherboard,
  MOUSE: BsMouse,
  HZ: BsRadar,
  RESOLUTION: MdOutlineScreenshotMonitor,
  USB: BsFillUsbPlugFill,
  TYPEC: BsUsbC,
};

export const iconList = [
  { name: "laptop", icon: FaLaptop },
  { name: "pc", icon: BsPc },
  { name: "bàn phím", icon: BsKeyboard },
  { name: "tai nghe", icon: BsHeadphones },
  { name: "chuột", icon: BsMouse2Fill },
  { name: "màn hình", icon: BsDisplay },
];
