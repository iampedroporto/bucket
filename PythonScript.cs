using itauapi;
using System.Diagnostics;

namespace consoleapp;

class PythonScript
{
    private string ScriptContent { get; set; }
    private string RequirementsContent { get; set; }
    private string PythonPath { get; set; }
    private string VenvPath { get; set; }
    private string ScriptPath { get; set; }
    private string RequirementsPath { get; set; }
    private string OutputFilePath { get; set; }
    private string ProcessName { get; set; }

    public PythonScript(string scriptContent, string requirementsContent, string pythonPath, string venvPath, string scriptPath, string requirementsPath, string outputFilePath, string processName)
    {
        ScriptContent = scriptContent;
        RequirementsContent = requirementsContent;
        PythonPath = pythonPath;
        VenvPath = venvPath;
        ScriptPath = scriptPath;
        RequirementsPath = requirementsPath;
        OutputFilePath = outputFilePath;
        ProcessName = processName;
    }

    private bool CreatePythonScript()
    {
        using (var sw = new StreamWriter(ScriptPath))
        {
            sw.Write(ScriptContent);
        }
        return true;
    }

    private bool CreateRequirements()
    {
        using (var sw = new StreamWriter(RequirementsPath))
        {
            sw.Write(RequirementsContent);
        }
        return true;
    }

    private bool CreateVirtualEnv()
    {
        var cmd = $"-m venv {VenvPath}";
        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = PythonPath,
                Arguments = cmd,
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                CreateNoWindow = true
            },
            EnableRaisingEvents = true
        };
        process.ErrorDataReceived += Process_OutputDataReceived;
        process.OutputDataReceived += Process_OutputDataReceived;

        process.Start();
        process.BeginErrorReadLine();
        process.BeginOutputReadLine();
        process.WaitForExit();

        return (process.ExitCode == 0) ? true : false;
    }

    private bool InstallRequirements()
    {
        var cmd = $"-m pip install -r {RequirementsPath}";
        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = $"{VenvPath}/bin/python",
                Arguments = cmd,
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                CreateNoWindow = true
            },
            EnableRaisingEvents = true
        };
        process.ErrorDataReceived += Process_OutputDataReceived;
        process.OutputDataReceived += Process_OutputDataReceived;

        process.Start();
        process.BeginErrorReadLine();
        process.BeginOutputReadLine();
        process.WaitForExit();

        return (process.ExitCode == 0) ? true : false;
    }

    private bool RunPythonScript()
    {
        var cmd = $"-u {ScriptPath}";
        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = $"{VenvPath}/bin/python",
                Arguments = cmd,
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                CreateNoWindow = true
            },
            EnableRaisingEvents = true
        };
        process.ErrorDataReceived += Process_OutputDataReceived;
        process.OutputDataReceived += Process_OutputDataReceived;

        process.Start();
        process.BeginErrorReadLine();
        process.BeginOutputReadLine();
        process.WaitForExit();

        return (process.ExitCode == 0) ? true : false;
    }

    private void Process_OutputDataReceived(object sender, DataReceivedEventArgs e)
    {
        SaveProcessOutput(OutputFilePath, e.Data);
    }

    private void SaveProcessOutput(string path, string? content)
    {
        System.IO.FileInfo file = new System.IO.FileInfo(path);
        if (file == null) return;
        file.Directory.Create(); // If the directory already exists, this method does nothing.

        using (StreamWriter sw = File.AppendText(path))
        {
            sw.WriteLine(content);
        }
    }

    public string? ReadOutputFile()
    {
        try
        {
            using (StreamReader sr = new StreamReader(OutputFilePath))
            {
                return sr.ReadToEnd();
            }
        }
        catch (Exception ex)
        {
            ExceptionHandler(ex);
            return null;
        }
    }

    private void ExceptionHandler(Exception ex)
    {
        Console.WriteLine($"erro: {ex}");
    }

    public void ClearProcessFiles()
    {
        try
        {
            if (Directory.Exists(VenvPath))
            {
                Directory.Delete(VenvPath, true);
            }
        }
        catch (Exception ex)
        {
            ExceptionHandler(ex);
        }
    }

    public bool Run()
    {
        try
        {
            var statusVenv = CreateVirtualEnv();
            if (!statusVenv) return statusVenv;

            var statusScript = CreatePythonScript();
            if (!statusScript) return statusScript;

            var statusRequirements = CreateRequirements();
            if (!statusRequirements) return statusRequirements;

            var statusInstall = InstallRequirements();
            if (!statusInstall) return statusInstall;

            var statusRunScript = RunPythonScript();
            return statusRunScript;
        }
        catch (Exception ex)
        {
            ExceptionHandler(ex);
            return false;
        }
    }
}

class Program
{
    static void Main(string[] args)
    {
        // itauapi.Program.Main(new string[]{});
        var scriptContent = """ 
        import time

        for i in range(5):
            print("Hello World " + str(i))
            time.sleep(1)

        import pandas as pd

        df = pd.DataFrame({"a": [1, 2, 3], "b": [4, 5, 6]})

        df = pd.concat([df, df, df, df, df], axis=0)

        print(df)
        """;

        var requirementsContent = """
        pandas
        pyspark
        """;

        var ppProcessName = "calculadora_pedro";
        var mainPythonPath = "/Users/pedroporto/miniforge3/bin/python";
        var venvPath = $"/Users/pedroporto/projects/itau/consoleapp/{ppProcessName}";
        var scriptPath = $"/Users/pedroporto/projects/itau/consoleapp/{ppProcessName}/script.py";
        var requirementsPath = $"/Users/pedroporto/projects/itau/consoleapp/{ppProcessName}/requirements.txt";
        var outputFilePath = $"/Users/pedroporto/projects/itau/consoleapp/{ppProcessName}/output.txt";

        Console.WriteLine("inicio da aplicação");

        var pythonScript = new PythonScript(scriptContent, requirementsContent, mainPythonPath, venvPath, scriptPath, requirementsPath, outputFilePath, ppProcessName);
        var status = pythonScript.Run();
        Console.WriteLine(status);
        if (status)
        {
            var output = pythonScript.ReadOutputFile();
            Console.WriteLine(output);
            pythonScript.ClearProcessFiles();
        }

        Console.WriteLine("fim da aplicação");
    }
}
