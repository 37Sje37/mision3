export function Header({ searchTerm, setSearchTerm, selectedRole, setSelectedRole, roles }) {
  return (
    <header className="header">
      <h1>LoL Champion Explorer</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar campeón..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Buscar campeones"
        />
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          aria-label="Filtrar por rol"
        >
          <option value="ALL">Todos los roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}