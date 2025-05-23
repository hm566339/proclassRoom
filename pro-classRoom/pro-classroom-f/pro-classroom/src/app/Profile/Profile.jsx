import React from "react";
import Profiledata from "./Profiledata";

const Profile = () => {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg space-y-6">
      {/* Profile Header */}
      <div className="text-center">
        <img
          src={Profiledata.profilePicture}
          alt={Profiledata.username}
          className="w-24 h-24 mx-auto rounded-full"
        />
        <h2 className="text-xl font-bold mt-2">{Profiledata.fullName}</h2>
        <p className="text-gray-500">@{Profiledata.username}</p>
        <p className="text-gray-700">{Profiledata.bio}</p>
      </div>

      {/* Stats */}
      <div className="flex justify-around text-center">
        <div>
          <p className="text-lg font-semibold">{Profiledata.stats.posts}</p>
          <p className="text-gray-500">Posts</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{Profiledata.stats.followers}</p>
          <p className="text-gray-500">Followers</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{Profiledata.stats.following}</p>
          <p className="text-gray-500">Following</p>
        </div>
      </div>

      {/* Posts */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
        {Profiledata.posts.map((post) => (
          <div
            key={post.id}
            className="p-4 mb-4 bg-gray-100 rounded-xl shadow-sm"
          >
            <p>{post.content}</p>
            <p className="text-sm text-gray-400">
              {new Date(post.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
