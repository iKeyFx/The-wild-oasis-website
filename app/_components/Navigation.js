import Link from "next/link";
import { auth } from "../_lib/auth";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MobileNav from "./MobileNav";

// export default async function Navigation() {
//   const session = await auth();
//   return (
//     <nav className="z-10 text-xl">
//       <ul className="flex gap-16 items-center">
//         <li>
//           <Link
//             href="/cabins"
//             className="hover:text-accent-400 transition-colors"
//           >
//             Cabins
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/about"
//             className="hover:text-accent-400 transition-colors"
//           >
//             About
//           </Link>
//         </li>
//         <li>
//           {session?.user?.image ? (
//             <Link
//               href="/account"
//               className="flex items-center gap-4 hover:text-accent-400 transition-colors"
//             >
//               <img
//                 className="h-8 rounded-full"
//                 alt={session.user.image}
//                 src={session.user.image}
//                 referrerPolicy="no-referrer"
//               />
//               <span>Guest area</span>
//             </Link>
//           ) : (
//             <Link
//               href="/account"
//               className="hover:text-accent-400 transition-colors"
//             >
//               Guest area
//             </Link>
//           )}
//         </li>
//       </ul>
//     </nav>
//   );
// }

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="flex items-center gap-4 hover:text-accent-400 transition-colors"
            >
              <img
                className="h-8 rounded-full"
                alt={session.user.name || "User"}
                src={session.user.image}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>

      {/* Mobile Navigation */}
      <MobileNav session={session} />
    </nav>
  );
}
