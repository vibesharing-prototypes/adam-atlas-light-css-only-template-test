"use client";

import { useState } from "react";

// Types
type Audit = {
  id: string;
  title: string;
  description: string;
  status: "scheduled" | "in-progress" | "completed" | "overdue";
  assignedTo: string;
  assignedGroup: string;
  scheduledDate: string;
  dueDate: string;
  createdAt: string;
};

type Person = {
  id: string;
  name: string;
  email: string;
  role: string;
  groups: string[];
};

type Group = {
  id: string;
  name: string;
  description: string;
  memberIds: string[];
  createdAt: string;
};

// Initial sample data
const initialAudits: Audit[] = [
  {
    id: "1",
    title: "Q2 Financial Compliance Audit",
    description: "Review financial records and compliance with regulatory requirements",
    status: "scheduled",
    assignedTo: "1",
    assignedGroup: "1",
    scheduledDate: "2026-05-15",
    dueDate: "2026-05-30",
    createdAt: "2026-05-01",
  },
  {
    id: "2",
    title: "IT Security Assessment",
    description: "Comprehensive security audit of all IT systems and infrastructure",
    status: "in-progress",
    assignedTo: "2",
    assignedGroup: "2",
    scheduledDate: "2026-05-10",
    dueDate: "2026-05-20",
    createdAt: "2026-05-01",
  },
  {
    id: "3",
    title: "HR Policy Review",
    description: "Annual review of HR policies and employee handbook",
    status: "completed",
    assignedTo: "3",
    assignedGroup: "3",
    scheduledDate: "2026-04-01",
    dueDate: "2026-04-30",
    createdAt: "2026-03-15",
  },
];

const initialPeople: Person[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Senior Auditor",
    groups: ["1"],
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    role: "IT Auditor",
    groups: ["2"],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    role: "Compliance Officer",
    groups: ["3"],
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@company.com",
    role: "Junior Auditor",
    groups: ["1", "2"],
  },
];

const initialGroups: Group[] = [
  {
    id: "1",
    name: "Financial Audit Team",
    description: "Team responsible for financial audits and compliance",
    memberIds: ["1", "4"],
    createdAt: "2026-01-01",
  },
  {
    id: "2",
    name: "IT Security Team",
    description: "Team handling IT security audits and assessments",
    memberIds: ["2", "4"],
    createdAt: "2026-01-01",
  },
  {
    id: "3",
    name: "HR Compliance Team",
    description: "Team managing HR policies and compliance",
    memberIds: ["3"],
    createdAt: "2026-01-01",
  },
];

export default function Page() {
  const [view, setView] = useState<"audits" | "people" | "groups">("audits");
  const [audits, setAudits] = useState<Audit[]>(initialAudits);
  const [people, setPeople] = useState<Person[]>(initialPeople);
  const [groups, setGroups] = useState<Group[]>(initialGroups);

  // Modal states
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [showPersonModal, setShowPersonModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [editingAudit, setEditingAudit] = useState<Audit | null>(null);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);

  // Audit handlers
  const handleCreateAudit = (audit: Omit<Audit, "id" | "createdAt">) => {
    const newAudit: Audit = {
      ...audit,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setAudits([...audits, newAudit]);
    setShowAuditModal(false);
  };

  const handleUpdateAudit = (audit: Audit) => {
    setAudits(audits.map((a) => (a.id === audit.id ? audit : a)));
    setShowAuditModal(false);
    setEditingAudit(null);
  };

  const handleDeleteAudit = (id: string) => {
    if (confirm("Are you sure you want to delete this audit?")) {
      setAudits(audits.filter((a) => a.id !== id));
    }
  };

  // Person handlers
  const handleCreatePerson = (person: Omit<Person, "id">) => {
    const newPerson: Person = {
      ...person,
      id: Date.now().toString(),
    };
    setPeople([...people, newPerson]);
    setShowPersonModal(false);
  };

  const handleUpdatePerson = (person: Person) => {
    setPeople(people.map((p) => (p.id === person.id ? person : p)));
    setShowPersonModal(false);
    setEditingPerson(null);
  };

  const handleDeletePerson = (id: string) => {
    if (confirm("Are you sure you want to delete this person?")) {
      setPeople(people.filter((p) => p.id !== id));
      // Remove from groups
      setGroups(
        groups.map((g) => ({
          ...g,
          memberIds: g.memberIds.filter((mId) => mId !== id),
        }))
      );
    }
  };

  // Group handlers
  const handleCreateGroup = (group: Omit<Group, "id" | "createdAt">) => {
    const newGroup: Group = {
      ...group,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setGroups([...groups, newGroup]);
    setShowGroupModal(false);
  };

  const handleUpdateGroup = (group: Group) => {
    setGroups(groups.map((g) => (g.id === group.id ? group : g)));
    setShowGroupModal(false);
    setEditingGroup(null);
  };

  const handleDeleteGroup = (id: string) => {
    if (confirm("Are you sure you want to delete this group?")) {
      setGroups(groups.filter((g) => g.id !== id));
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <h1>Enterprise Audit Manager</h1>
          <nav className="nav">
            <button
              className={`nav-button ${view === "audits" ? "active" : ""}`}
              onClick={() => setView("audits")}
            >
              Audits
            </button>
            <button
              className={`nav-button ${view === "people" ? "active" : ""}`}
              onClick={() => setView("people")}
            >
              People
            </button>
            <button
              className={`nav-button ${view === "groups" ? "active" : ""}`}
              onClick={() => setView("groups")}
            >
              Groups
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {view === "audits" && (
          <AuditsView
            audits={audits}
            people={people}
            groups={groups}
            onCreateAudit={() => setShowAuditModal(true)}
            onEditAudit={(audit) => {
              setEditingAudit(audit);
              setShowAuditModal(true);
            }}
            onDeleteAudit={handleDeleteAudit}
          />
        )}

        {view === "people" && (
          <PeopleView
            people={people}
            groups={groups}
            onCreatePerson={() => setShowPersonModal(true)}
            onEditPerson={(person) => {
              setEditingPerson(person);
              setShowPersonModal(true);
            }}
            onDeletePerson={handleDeletePerson}
          />
        )}

        {view === "groups" && (
          <GroupsView
            groups={groups}
            people={people}
            onCreateGroup={() => setShowGroupModal(true)}
            onEditGroup={(group) => {
              setEditingGroup(group);
              setShowGroupModal(true);
            }}
            onDeleteGroup={handleDeleteGroup}
          />
        )}
      </main>

      {showAuditModal && (
        <AuditModal
          audit={editingAudit}
          people={people}
          groups={groups}
          onSave={editingAudit ? handleUpdateAudit : handleCreateAudit}
          onClose={() => {
            setShowAuditModal(false);
            setEditingAudit(null);
          }}
        />
      )}

      {showPersonModal && (
        <PersonModal
          person={editingPerson}
          groups={groups}
          onSave={editingPerson ? handleUpdatePerson : handleCreatePerson}
          onClose={() => {
            setShowPersonModal(false);
            setEditingPerson(null);
          }}
        />
      )}

      {showGroupModal && (
        <GroupModal
          group={editingGroup}
          people={people}
          onSave={editingGroup ? handleUpdateGroup : handleCreateGroup}
          onClose={() => {
            setShowGroupModal(false);
            setEditingGroup(null);
          }}
        />
      )}
    </div>
  );
}

// Audits View Component
function AuditsView({
  audits,
  people,
  groups,
  onCreateAudit,
  onEditAudit,
  onDeleteAudit,
}: {
  audits: Audit[];
  people: Person[];
  groups: Group[];
  onCreateAudit: () => void;
  onEditAudit: (audit: Audit) => void;
  onDeleteAudit: (id: string) => void;
}) {
  const getPersonName = (id: string) =>
    people.find((p) => p.id === id)?.name || "Unassigned";
  const getGroupName = (id: string) =>
    groups.find((g) => g.id === id)?.name || "No Group";

  return (
    <>
      <div className="view-header">
        <h2>Audits</h2>
        <button className="button" onClick={onCreateAudit}>
          + Create Audit
        </button>
      </div>

      {audits.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <div className="empty-state-title">No audits yet</div>
          <div className="empty-state-description">
            Create your first audit to get started
          </div>
          <button className="button" onClick={onCreateAudit}>
            + Create Audit
          </button>
        </div>
      ) : (
        <div className="card-grid">
          {audits.map((audit) => (
            <div key={audit.id} className="audit-card">
              <div className="audit-card-header">
                <div>
                  <div className="audit-card-title">{audit.title}</div>
                  <div className="audit-card-meta">ID: {audit.id}</div>
                </div>
                <div className="audit-card-actions">
                  <button
                    className="icon-button"
                    onClick={() => onEditAudit(audit)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className="icon-button danger"
                    onClick={() => onDeleteAudit(audit.id)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="audit-card-body">
                <p className="audit-card-description">{audit.description}</p>

                <div className="audit-card-info">
                  <div className="info-row">
                    <span className="info-label">Status:</span>
                    <span className={`status-badge status-${audit.status}`}>
                      {audit.status.replace("-", " ")}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Assigned To:</span>
                    <span className="info-value">
                      {getPersonName(audit.assignedTo)}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Group:</span>
                    <span className="info-value">
                      {getGroupName(audit.assignedGroup)}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Scheduled:</span>
                    <span className="info-value">{audit.scheduledDate}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Due Date:</span>
                    <span className="info-value">{audit.dueDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// People View Component
function PeopleView({
  people,
  groups,
  onCreatePerson,
  onEditPerson,
  onDeletePerson,
}: {
  people: Person[];
  groups: Group[];
  onCreatePerson: () => void;
  onEditPerson: (person: Person) => void;
  onDeletePerson: (id: string) => void;
}) {
  const getGroupNames = (groupIds: string[]) =>
    groupIds
      .map((id) => groups.find((g) => g.id === id)?.name)
      .filter(Boolean)
      .join(", ") || "No groups";

  return (
    <>
      <div className="view-header">
        <h2>People</h2>
        <button className="button" onClick={onCreatePerson}>
          + Add Person
        </button>
      </div>

      {people.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <div className="empty-state-title">No people yet</div>
          <div className="empty-state-description">
            Add people to assign them to audits
          </div>
          <button className="button" onClick={onCreatePerson}>
            + Add Person
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Groups</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person) => (
                <tr key={person.id}>
                  <td>
                    <strong>{person.name}</strong>
                  </td>
                  <td>{person.email}</td>
                  <td>{person.role}</td>
                  <td>{getGroupNames(person.groups)}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="button button-small button-secondary"
                        onClick={() => onEditPerson(person)}
                      >
                        Edit
                      </button>
                      <button
                        className="button button-small button-danger"
                        onClick={() => onDeletePerson(person.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

// Groups View Component
function GroupsView({
  groups,
  people,
  onCreateGroup,
  onEditGroup,
  onDeleteGroup,
}: {
  groups: Group[];
  people: Person[];
  onCreateGroup: () => void;
  onEditGroup: (group: Group) => void;
  onDeleteGroup: (id: string) => void;
}) {
  const getMemberNames = (memberIds: string[]) =>
    memberIds
      .map((id) => people.find((p) => p.id === id)?.name)
      .filter(Boolean)
      .join(", ") || "No members";

  return (
    <>
      <div className="view-header">
        <h2>Groups</h2>
        <button className="button" onClick={onCreateGroup}>
          + Create Group
        </button>
      </div>

      {groups.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <div className="empty-state-title">No groups yet</div>
          <div className="empty-state-description">
            Create groups to organize your team
          </div>
          <button className="button" onClick={onCreateGroup}>
            + Create Group
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Members</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <tr key={group.id}>
                  <td>
                    <strong>{group.name}</strong>
                  </td>
                  <td>{group.description}</td>
                  <td>{getMemberNames(group.memberIds)}</td>
                  <td>{group.createdAt}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="button button-small button-secondary"
                        onClick={() => onEditGroup(group)}
                      >
                        Edit
                      </button>
                      <button
                        className="button button-small button-danger"
                        onClick={() => onDeleteGroup(group.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

// Audit Modal Component
function AuditModal({
  audit,
  people,
  groups,
  onSave,
  onClose,
}: {
  audit: Audit | null;
  people: Person[];
  groups: Group[];
  onSave: (audit: any) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<Omit<Audit, "id" | "createdAt">>(
    audit || {
      title: "",
      description: "",
      status: "scheduled",
      assignedTo: people[0]?.id || "",
      assignedGroup: groups[0]?.id || "",
      scheduledDate: "",
      dueDate: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (audit) {
      onSave({ ...audit, ...formData });
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{audit ? "Edit Audit" : "Create New Audit"}</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              className="form-input"
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as Audit["status"],
                })
              }
            >
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Assign To</label>
            <select
              className="form-select"
              value={formData.assignedTo}
              onChange={(e) =>
                setFormData({ ...formData, assignedTo: e.target.value })
              }
            >
              {people.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Group</label>
            <select
              className="form-select"
              value={formData.assignedGroup}
              onChange={(e) =>
                setFormData({ ...formData, assignedGroup: e.target.value })
              }
            >
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Scheduled Date</label>
            <input
              className="form-input"
              type="date"
              required
              value={formData.scheduledDate}
              onChange={(e) =>
                setFormData({ ...formData, scheduledDate: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Due Date</label>
            <input
              className="form-input"
              type="date"
              required
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="button button-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="button">
              {audit ? "Update" : "Create"} Audit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Person Modal Component
function PersonModal({
  person,
  groups,
  onSave,
  onClose,
}: {
  person: Person | null;
  groups: Group[];
  onSave: (person: any) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<Omit<Person, "id">>(
    person || {
      name: "",
      email: "",
      role: "",
      groups: [],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (person) {
      onSave({ ...person, ...formData });
    } else {
      onSave(formData);
    }
  };

  const toggleGroup = (groupId: string) => {
    setFormData({
      ...formData,
      groups: formData.groups.includes(groupId)
        ? formData.groups.filter((id) => id !== groupId)
        : [...formData.groups, groupId],
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{person ? "Edit Person" : "Add New Person"}</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              className="form-input"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Role</label>
            <input
              className="form-input"
              type="text"
              required
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Groups</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {groups.map((group) => (
                <label
                  key={group.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.groups.includes(group.id)}
                    onChange={() => toggleGroup(group.id)}
                  />
                  {group.name}
                </label>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="button button-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="button">
              {person ? "Update" : "Add"} Person
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Group Modal Component
function GroupModal({
  group,
  people,
  onSave,
  onClose,
}: {
  group: Group | null;
  people: Person[];
  onSave: (group: any) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<Omit<Group, "id" | "createdAt">>(
    group || {
      name: "",
      description: "",
      memberIds: [],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (group) {
      onSave({ ...group, ...formData });
    } else {
      onSave(formData);
    }
  };

  const toggleMember = (personId: string) => {
    setFormData({
      ...formData,
      memberIds: formData.memberIds.includes(personId)
        ? formData.memberIds.filter((id) => id !== personId)
        : [...formData.memberIds, personId],
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{group ? "Edit Group" : "Create New Group"}</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Group Name</label>
            <input
              className="form-input"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Members</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {people.map((person) => (
                <label
                  key={person.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.memberIds.includes(person.id)}
                    onChange={() => toggleMember(person.id)}
                  />
                  {person.name} - {person.role}
                </label>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="button button-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="button">
              {group ? "Update" : "Create"} Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
