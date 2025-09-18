import AvatarDropdown from "./AvatarDropdown";
import { HeaderTabs } from "./HeaderTabs";

export default function Header() {
  return (
    <header className="p-4">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-3xl font-semibold">Budgeto</h1>
        <HeaderTabs className="hidden sm:block" />
        {/* Dropdown with settings and logout */}
        <nav>
          <AvatarDropdown />
        </nav>
      </div>
      <div className="flex justify-center mt-4">
        <HeaderTabs className="block sm:hidden w-full " />
      </div>
    </header>
  );
}
