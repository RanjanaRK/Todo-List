import { darkAtom } from "@/utils/atoms/darkAtom";
import { Button } from "@nextui-org/button";
import { useAtom } from "jotai/react";
import { MoonIcon, SunIcon } from "lucide-react";

const Darkmode = () => {
  const [darkMode, setDarkMode] = useAtom(darkAtom);
  return (
    <div className="">
      <Button
        isIconOnly
        variant="light"
        onPress={() => setDarkMode(!darkMode)}>
        {darkMode ? <MoonIcon /> : <SunIcon />}
      </Button>
    </div>
  );
};

export default Darkmode;
