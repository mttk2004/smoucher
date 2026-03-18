import type { Route } from "./+types/settings.users";
import { useUsers, useUpdateUser } from "../features/users/hooks";
import { useQueryStates, parseAsInteger, parseAsString } from "nuqs";
import { Pagination } from "../components/ui/Pagination";
import { useState } from "react";
import toast from "react-hot-toast";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smoucher | User Management" },
    {
      name: "description",
      content:
        "Control access levels and manage permissions for your team members.",
    },
  ];
}

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditModalOpen, setIsModalOpen] = useState(false);

  const [searchParams, setSearchParams] = useQueryStates({
    page: parseAsInteger.withDefault(0),
    size: parseAsInteger.withDefault(10),
    search: parseAsString.withDefault(""),
    role: parseAsString.withDefault(""),
  });

  const { data: pageData, isLoading } = useUsers(
    searchParams.page,
    searchParams.size,
    searchParams.search,
    searchParams.role,
  );

  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage });
  };

  const handleEditRole = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const onUpdateRole = (newRole: string) => {
    if (!selectedUser) return;

    updateUser(
      {
        id: selectedUser.id,
        data: {
          fullName: selectedUser.fullName,
          email: selectedUser.email,
          role: newRole as any,
        },
      },
      {
        onSuccess: () => {
          toast.success("User role updated successfully");
          setIsModalOpen(false);
        },
      }
    );
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              search
            </span>
            <input
              type="text"
              value={searchParams.search}
              onChange={(e) => setSearchParams({ search: e.target.value, page: 0 })}
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
             <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
               <span className="material-symbols-outlined text-[18px]">person_add</span>
               Invite User
             </button>
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
          <div className="flex gap-8 min-w-max">
            <button
              onClick={() => setSearchParams({ role: "", page: 0 })}
              className={`pb-4 text-sm flex items-center gap-2 transition-colors ${
                searchParams.role === ""
                  ? "font-bold border-b-2 border-primary text-primary"
                  : "font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              All Users{" "}
            </button>
            <button
              onClick={() => setSearchParams({ role: "ADMIN", page: 0 })}
              className={`pb-4 text-sm flex items-center gap-2 transition-colors ${
                searchParams.role === "ADMIN"
                  ? "font-bold border-b-2 border-primary text-primary"
                  : "font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              Admins{" "}
            </button>
            <button
              onClick={() => setSearchParams({ role: "STAFF", page: 0 })}
              className={`pb-4 text-sm flex items-center gap-2 transition-colors ${
                searchParams.role === "STAFF"
                  ? "font-bold border-b-2 border-primary text-primary"
                  : "font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              Staff{" "}
            </button>
          </div>
        </div>

        <div className="@container rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  User
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden md:table-cell">
                  Joined
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    <span className="material-symbols-outlined animate-spin text-2xl">
                      progress_activity
                    </span>
                  </td>
                </tr>
              ) : !pageData?.content?.length ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                pageData.content.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                          {user.fullName.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            {user.fullName}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                          user.role === "ADMIN"
                            ? "bg-primary/10 text-primary"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`size-2 rounded-full ${user.isActive ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"}`}
                        ></div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 hidden md:table-cell">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEditRole(user)}
                        className="text-primary hover:text-primary/80 text-sm font-bold transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5">
                        Edit Role
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pageData && pageData.totalPages > 1 && (
        <Pagination
          currentPage={pageData.number}
          totalPages={pageData.totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Edit Role Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-sm p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Change User Role</h3>
            <p className="text-sm text-slate-500 mb-6">Updating permissions for <strong>{selectedUser.fullName}</strong></p>

            <div className="space-y-3">
              <button
                onClick={() => onUpdateRole("ADMIN")}
                disabled={isUpdating}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${selectedUser.role === 'ADMIN' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                <div className="text-left">
                  <p className="font-bold text-slate-900 dark:text-white">Administrator</p>
                  <p className="text-xs text-slate-500">Full system access and settings control</p>
                </div>
                {selectedUser.role === 'ADMIN' && <span className="material-symbols-outlined text-primary text-xl">check_circle</span>}
              </button>

              <button
                onClick={() => onUpdateRole("STAFF")}
                disabled={isUpdating}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${selectedUser.role === 'STAFF' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                <div className="text-left">
                  <p className="font-bold text-slate-900 dark:text-white">Staff Member</p>
                  <p className="text-xs text-slate-500">Manage vouchers and view reports</p>
                </div>
                {selectedUser.role === 'STAFF' && <span className="material-symbols-outlined text-primary text-xl">check_circle</span>}
              </button>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
