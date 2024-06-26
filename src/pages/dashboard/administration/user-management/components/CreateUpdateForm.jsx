import { useEffect, useState } from "react";
import { user_role as roles } from "../../../../../global";
import { useGetAllDepartment } from "../../../../../hooks/api/useDepartmentApi";
import { useGetAllSkills } from "../../../../../hooks/api/useSkillsApi";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";

export function CreateUpdateForm({
  isUpdate = false,
  data = null,
  setUserData = null,
}) {
  /********** state ***************** */

  const [userName, setUserName] = useState(isUpdate ? data?.user_name : "");
  const [userNbr, setUserNbr] = useState(isUpdate ? data?.user_nbr : "");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("");
  const [userRole, setUserRole] = useState(isUpdate ? data?.user_role : []);
  
  const [showPwdSection, SetShowPwdSection] = useState(false);


  /**********  Submit and validation ****************** */

  useEffect(() => {
    setUserData({
      userName,
      userNbr,
      userPassword,
      userPasswordConfirm,
      userRole,
    });
  }, [
    setUserData,
    userName,
    userNbr,
    userPassword,
    userPasswordConfirm,
    userRole,
  ]);

  /********** Department ***************** */

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            margin="normal"
            required
            sx={{ flex: 3 }}
            id="user_name"
            label="Nom"
            name="userName"
            autoComplete="name"
            autoFocus
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            sx={{ flex: 2 }}
            id="user_nbr"
            label="Matricule"
            name="userNbr"
            value={userNbr}
            onChange={(e) => setUserNbr(e.target.value.trim())}
          />
        </Box>
        <Box sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="user_role_label">Rôle</InputLabel>
            <Select
              labelId="user_role_label"
              multiple
              id="user_role"
              value={userRole}
              onChange={(event) => {
                const value = event.target.value;
                setUserRole(
                  typeof value === "string" ? value.split(",") : value
                );
              }}
              input={<OutlinedInput label="Tag" />}
              renderValue={(_userRole) =>
                Object.keys(roles)
                  ?.filter((key) => _userRole.indexOf(key) > -1)
                  .map((key) => roles[key])
                  .join(", ")
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 250,
                  },
                },
              }}
            >
              {Object.keys(roles).map((key) => (
                <MenuItem key={key} value={key}>
                  <Checkbox checked={userRole.indexOf(key) > -1} />
                  <ListItemText primary={roles[key]} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="skills_label">Skills</InputLabel>
          <Select
            labelId="skills_label"
            multiple
            id="user_role"
            value={userSkills}
            onChange={(event) => {
              const value = event.target.value;
              console.log(value);
              setUserSkills(
                typeof value === "string" ? value.split(",") : value
              );
            }}
            input={<OutlinedInput label="Tag" />}
            renderValue={(_userSkills) =>
              Object.keys(skills)
                ?.filter((key) => _userSkills.indexOf(key) > -1)
                .map((key) => skills[key])
                .join(", ")
            }
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: 250,
                },
              },
            }}
          >
            {Object.keys(skills).map(
              (key) => (
                console.log("key: ", key),
                console.log(`skills[${key}]: `, skills[key]),
                console.log(
                  `userSkills.indexOf(${key}): `,
                  userSkills?.indexOf(key)
                )
              )
            )}
            {Object.keys(skills).map((key) => (
              <MenuItem key={key} value={key}>
                <Checkbox checked={userSkills?.indexOf(key) > -1} />
                <ListItemText primary={skills[key]} />
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        <Box>
          {isUpdate && (
            <>
              <Divider sx={{ my: 2 }} />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPwdSection}
                    onChange={(e) => SetShowPwdSection(e.target.checked)}
                  />
                }
                label="Changer le mot de passe"
              />
            </>
          )}
          {(!isUpdate || showPwdSection) && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                name="user_password"
                label="Mot de passe"
                type="password"
                id="user_password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="user_password_conform"
                label="Comfirmer le mot de passe"
                type="password"
                id="user_password_conform"
                value={userPasswordConfirm}
                onChange={(e) => setUserPasswordConfirm(e.target.value)}
                error={Boolean(
                  userPasswordConfirm && userPassword !== userPasswordConfirm
                )}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
