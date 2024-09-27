import { motion } from "framer-motion";
import pierrotAvatarUrl from "../../assets/myAvatar.jpg";
import thumbnailUrl from "../../assets/bk.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faGithubSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faCodeFork, faUsers, faBook } from "@fortawesome/free-solid-svg-icons";
import ToolTip from "../../components/Other/ToolTip";
import { useGithubInfo } from "../../hooks/useGithubInfo";
import { Loading } from "../../components";

const userInfo = {
  name: "Pierrot",
  position: "Freelance Developer",
  avatarUrl: pierrotAvatarUrl,
  gitHubUrl: "https://github.com/IamPierrot",
  linkedinUrl:
    "https://www.linkedin.com/in/ph%C3%A1t-nguy%E1%BB%85n-860660314/",
  thumbnailUrl: thumbnailUrl,
  facebookUrl: "https://www.facebook.com/saddestpersoninthewholeworld/",
};

const Home = () => {
  const { result: githubInfo, isLoading } = useGithubInfo();
  if (isLoading) return <Loading />;
  return (
    <div className="opacity-85">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, type: "spring" }}
        className="relative mx-4 mb-5 mt-16 max-w-2xl rounded-lg bg-white text-gray-900 shadow-xl sm:mx-auto sm:max-w-sm md:mx-auto md:max-w-sm lg:mx-auto lg:max-w-sm xl:mx-auto xl:max-w-sm"
      >
        <div className="h-32 overflow-hidden rounded-t-lg">
          <img
            className="w-full object-cover object-top"
            src={userInfo.thumbnailUrl}
            alt="Mountain"
          />
        </div>
        <div className="relative mx-auto -mt-16 h-32 w-32 overflow-hidden rounded-full border-4 border-white">
          <img
            className="h-32 object-cover object-center"
            src={userInfo.avatarUrl}
            alt="Pierrot"
          />
        </div>
        <div className="mt-2 text-center">
          <h2 className="font-semibold">{userInfo.name}</h2>
          <p className="text-gray-500">{userInfo.position}</p>
        </div>
        <ul className="mt-2 flex items-center justify-around py-4 text-gray-700">
          <ToolTip title="facebook">
            <a href={userInfo.facebookUrl}>
              <li className="flex flex-col items-center justify-around">
                <FontAwesomeIcon
                  className="h-10 w-10 fill-current text-blue-900"
                  icon={faFacebookSquare}
                />
              </li>
            </a>
          </ToolTip>
          <ToolTip title="Linkedin">
            <a href={userInfo.linkedinUrl}>
              <li className="flex flex-col items-center justify-between">
                <FontAwesomeIcon
                  className="h-10 w-10 fill-current text-sky-900"
                  icon={faLinkedin}
                />
              </li>
            </a>
          </ToolTip>
          <ToolTip title="Github">
            <a href={userInfo.gitHubUrl}>
              <li className="flex cursor-pointer flex-col items-center justify-around">
                <FontAwesomeIcon
                  className="h-10 w-10 fill-current text-black"
                  icon={faGithubSquare}
                ></FontAwesomeIcon>
              </li>
            </a>
          </ToolTip>
        </ul>
        <ToolTip title="Mail to me if you want" placement="top">
          <div className="mx-8 mt-2 border-t p-4">
            <a
              href="mailto:phatnguyentan836@gmail.com"
              className="mx-auto block w-1/2 justify-center rounded-full bg-gray-900 px-6 py-2 text-center align-middle font-semibold text-white hover:shadow-lg"
            >
              Mail Me
            </a>
          </div>
        </ToolTip>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="mb-7 mt-2 flex flex-wrap items-center justify-center gap-4"
      >
        {[
          {
            icon: faBook,
            label: "All Repositories",
            value:
              (githubInfo?.public_repos || 0) +
              (githubInfo?.owned_private_repos || 0),
          },
          {
            icon: faCodeFork,
            label: "Followers",
            value: githubInfo?.followers || 0,
          },
          {
            icon: faUsers,
            label: "Following",
            value: githubInfo?.following || 0,
          },
        ].map((item, index) => (
          <motion.a
            key={index}
            href={userInfo.gitHubUrl}
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
              },
            }}
            className="group relative flex h-20 w-40 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="flex flex-row items-center justify-center">
                <FontAwesomeIcon
                  icon={item.icon}
                  className="mr-3 text-gray-500 transition-transform duration-300 group-hover:-rotate-12"
                />
                <span className="font-bold text-gray-600">{item.value}</span>
              </div>
              <div className="mt-2 text-sm text-gray-400">{item.label}</div>
            </div>
            <span className="absolute inset-0 z-0 bg-slate-400 opacity-0 transition-opacity duration-300 group-hover:opacity-30"></span>
          </motion.a>
        ))}
      </motion.div>
      <div className="mb-10 flex h-full flex-col items-center justify-center">
        <div className="text-center">
          <p className="rounded-lg bg-gray-800 p-4 text-lg font-semibold italic text-white">
            {githubInfo?.bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
