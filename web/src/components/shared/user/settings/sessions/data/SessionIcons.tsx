import { Icon } from "@iconify/react";

export const getOSIcon = (os: string | undefined) => {
  switch (os?.toLowerCase()) {
    case "windows":
      return (
        <Icon icon="mdi:microsoft-windows" className="h-5 w-5 text-blue-500" />
      );
    case "macos":
    case "mac os":
      return <Icon icon="mdi:apple" className="h-5 w-5 text-gray-500" />;
    case "linux":
      return <Icon icon="mdi:linux" className="h-5 w-5 text-orange-500" />;
    case "ios":
      return <Icon icon="mdi:apple-ios" className="h-5 w-5 text-gray-500" />;
    case "android":
      return <Icon icon="mdi:android" className="h-5 w-5 text-green-600" />;
    case "ubuntu":
      return <Icon icon="mdi:ubuntu" className="h-5 w-5 text-orange-600" />;
    case "chrome os":
      return (
        <Icon icon="mdi:google-chrome" className="h-5 w-5 text-green-500" />
      );
    case "fedora":
      return <Icon icon="mdi:fedora" className="h-5 w-5 text-blue-600" />;
    case "centos":
      return <Icon icon="mdi:centos" className="h-5 w-5 text-red-500" />;
    case "debian":
      return <Icon icon="mdi:debian" className="h-5 w-5 text-red-600" />;
    default:
      return <Icon icon="mdi:monitor" className="h-5 w-5 text-gray-400" />;
  }
};

export const getBrowserIcon = (browser: string | undefined) => {
  switch (browser?.toLowerCase()) {
    case "chrome":
      return (
        <Icon icon="mdi:google-chrome" className="h-5 w-5 text-green-500" />
      );
    case "firefox":
      return <Icon icon="mdi:firefox" className="h-5 w-5 text-orange-500" />;
    case "safari":
      return <Icon icon="mdi:safari" className="h-5 w-5 text-blue-500" />;
    case "microsoft edge":
    case "edge":
      return (
        <Icon icon="mdi:microsoft-edge" className="h-5 w-5 text-blue-600" />
      );
    case "opera":
      return <Icon icon="mdi:opera" className="h-5 w-5 text-red-500" />;
    case "samsung browser":
      return <Icon icon="mdi:samsung" className="h-5 w-5 text-blue-700" />;
    case "uc browser":
      return (
        <Icon icon="mdi:alpha-u-circle" className="h-5 w-5 text-blue-500" />
      );
    case "brave":
      return <Icon icon="mdi:shield" className="h-5 w-5 text-orange-600" />;
    case "vivaldi":
      return (
        <Icon icon="mdi:alpha-v-circle" className="h-5 w-5 text-red-600" />
      );
    case "yandex browser":
      return (
        <Icon icon="mdi:alpha-y-circle" className="h-5 w-5 text-red-500" />
      );
    default:
      return <Icon icon="mdi:web" className="h-5 w-5 text-gray-400" />;
  }
};

export const getDeviceIcon = (type: string | undefined) => {
  switch (type?.toLowerCase()) {
    case "mobile":
      return <Icon icon="mdi:cellphone" className="h-5 w-5 text-gray-600" />;
    case "desktop":
      return <Icon icon="mdi:monitor" className="h-5 w-5 text-gray-600" />;
    default:
      return <Icon icon="mdi:laptop" className="h-5 w-5 text-gray-600" />;
  }
};
