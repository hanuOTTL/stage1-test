export function generateJavaScriptTemplate({ candidateCode, inputType }) {
  const candidatePlaceholder = candidateCode || "";
  let inputProcessingCode = "";
  switch (inputType) {
    case "integer":
      inputProcessingCode = `
    function processInput(input) {
      return Number(input.trim());
    }`;
      break;
    case "array":
      inputProcessingCode = `
     function processInput(input) {
  return input.split(',').map(item => parseFloat(item.trim()));
}`;
      break;
    case "matrix":
      inputProcessingCode = `
    function processInput(input) {
      let lines = input.split('\\n').map(line => line.trim());
      let matrix = [];
      // Assuming the first line contains dimensions (e.g., "3,3")
      lines.slice(1).forEach(line => {
        let row = line.split(',').map(num => Number(num.trim()));
        matrix.push(row);
      });
      return matrix;
    }`;
      break;
    case "graph":
      inputProcessingCode = `
    function processInput(input) {
      let lines = input.split('\\n').map(line => line.trim());
      let numNodes = Number(lines[0].trim());
      let graph = new Array(numNodes).fill().map(() => []);
      lines.slice(1).forEach(line => {
        let nodes = line.split(',').map(num => Number(num.trim()));
        let [node, ...edges] = nodes;
        // Push edges so that multiple entries for a node are concatenated
        graph[node].push(...edges);
      });
      return graph;
    }`;
      break;
    case "linkedlist":
      inputProcessingCode = `
    function processInput(input) {
      let values = input.split(',').map(num => Number(num.trim()));
      let head = null;
      let current = null;
      values.forEach(value => {
        let node = { val: value, next: null };
        if (!head) head = node;
        if (current) current.next = node;
        current = node;
      });
      return head;
    }`;
      break;
    default:
      inputProcessingCode = `
    function processInput(input) {
      return input;
    }`;
      break;
  }

  const outputProcessingCode = `
    function processOutput(output) {
      return output.toString();
    }`;

  return `
    // ----- Candidate Code Start -----
    ${candidatePlaceholder}
    // ----- Candidate Code End -----
    
    // Modular Input/Output Processing
    ${inputProcessingCode}
    
    ${outputProcessingCode}
    
    // Main Wrapper Code
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    
    let inputData = "";
    process.stdin.on("data", chunk => {
      inputData += chunk;
    });
    
    process.stdin.on("end", () => {
      const input = processInput(inputData.trim());
      const output = solve(input); // 'solve' is the candidate's function
      console.log(processOutput(output));
    });
    `;
}

export function generateJavaTemplate({ candidateCode, inputType }) {
  const candidatePlaceholder = candidateCode || "[CANDIDATE_CODE]";
  let inputProcessingCode = "";
  let parsedInput = "";
  switch (inputType) {
    case "integer":
      inputProcessingCode = `
            public static int processInput(String input) {
                // Trim the input to remove leading and trailing spaces
                input = input.trim();
                return Integer.parseInt(input); 
                }`;
      break;
    case "array":
      inputProcessingCode = `
            public static int[] processInput(String input) {
                // Remove spaces and split the input by commas
                input = input.replaceAll("\\s+", ""); // Remove spaces
                String[] parts = input.split(",");
                int[] result = new int[parts.length];
                for (int i = 0; i < parts.length; i++) {
                    result[i] = Integer.parseInt(parts[i].trim());
                }
                return result;
            }`;
      break;
    case "matrix":
      inputProcessingCode = `
          public static int[][] processInput(String input) {
              String[] lines = input.split("\\n");
              String[] dims = lines[0].split(",");
              int rows = Integer.parseInt(dims[0].trim());
              int cols = Integer.parseInt(dims[1].trim());
              int[][] matrix = new int[rows][cols];
              for (int i = 1; i < lines.length; i++) {
                  String[] row = lines[i].split(",");
                  for (int j = 0; j < row.length; j++) {
                      matrix[i-1][j] = Integer.parseInt(row[j].trim());
                  }
              }
              return matrix;
          }`;
      break;
    case "graph":
      inputProcessingCode = `
          public static Map<Integer, List<Integer>> processInput(String input) {
              Map<Integer, List<Integer>> graph = new HashMap<>();
              String[] lines = input.split("\\n");
              int numNodes = Integer.parseInt(lines[0].trim());
              for (int i = 1; i < lines.length; i++) {
                  String[] parts = lines[i].split(",");
                  int node = Integer.parseInt(parts[0].trim());
                  List<Integer> edges = graph.computeIfAbsent(node, k -> new ArrayList<>());
                  for (int j = 1; j < parts.length; j++) {
                      edges.add(Integer.parseInt(parts[j].trim()));
                  }
              }
              return graph;
          }`;
      break;
    case "linkedlist":
      inputProcessingCode = `
            public static ListNode processInput(String input) {
                // Split the input string by commas to get the individual values
                String[] parts = input.split(","); 
                
                ListNode head = null, current = null;
                
                // Loop through the parts and create the linked list
                for(String part : parts) {
                    ListNode node = new ListNode(Integer.parseInt(part.trim())); // Convert each part to an integer
                    
                    if (head == null) {
                        head = node; // The first node becomes the head
                    } else {
                        current.next = node; // Link the current node to the next
                    }
                    current = node; // Move to the next node
                }
                return head; // Return the head of the linked list
            }`;
      break;

    default:
      inputProcessingCode = `
          public static String processInput(String input) {
              return input;
          }`;
      break;
  }

  switch (inputType) {
    case "integer":
      parsedInput = `
            int parsedInput = processInput(input); 
        `;
      break;

    case "array":
      parsedInput = `
            int[] parsedInput = processInput(input);
        `;
      break;

    case "matrix":
      parsedInput = `
            int[][] parsedInput = processInput(input);
        `;
      break;

    case "graph":
      parsedInput = `
            Map<Integer, List<Integer>> parsedInput = processInput(input);
        `;
      break;

    case "linkedlist":
      parsedInput = `
            ListNode parsedInput = processInput(input);
        `;
      break;

    default:
      parsedInput = `
            String parsedInput = processInput(input);
        `;
      break;
  }

  const outputProcessingCode = `
          public static String processOutput(Object output) {
              return output.toString();
          }`;

  return `
      import java.util.*;
      public class Main {
          // ----- Candidate Code Start -----
          ${candidatePlaceholder}
          // ----- Candidate Code End -----
      
      ${inputProcessingCode}
      
      ${outputProcessingCode}
      
          public static void main(String[] args) {
              Scanner sc = new Scanner(System.in);
              StringBuilder sb = new StringBuilder();
              while(sc.hasNextLine()){
                  sb.append(sc.nextLine()).append("\\n");
              }
              sc.close();
              String inputData = sb.toString().trim();
              // [INPUT_TYPE] and [OUTPUT_TYPE] are replaced by backend parameters
              String input = inputData;
              ${parsedInput}
              int output = solve(parsedInput);
              System.out.println(processOutput(output));
          }
      }
      
      class ListNode {
          int val;
          ListNode next;
          ListNode(int x) { val = x; }
      }
      `;
}


export function generatePythonTemplate({ candidateCode, inputType }) {
  const candidatePlaceholder = candidateCode || "[CANDIDATE_CODE]";

    
  let inputProcessingCode = "";
  switch (inputType) {
    case "integer":
      inputProcessingCode = `
def process_input(input_data):
    if ',' not in input_data:
        return int(input_data.strip())  # Return the integer directly
    return [int(x.strip()) for x in input_data.split(',')]
`;
      break;
    case "array":
      inputProcessingCode = `
def process_input(input_data):
    return [int(x.strip()) for x in input_data.split(',')]`;
      break;
    case "matrix":
      inputProcessingCode = `
def process_input(input_data):
    lines = input_data.split('\\n')
    dims = lines[0].split(',')
    rows = int(dims[0].strip())
    cols = int(dims[1].strip())
    matrix = []
    for line in lines[1:]:
        row = [int(x.strip()) for x in line.split(',')]
        matrix.append(row)
    return matrix`;
      break;
    case "graph":
      inputProcessingCode = `
def process_input(input_data):
    lines = input_data.split('\\n')
    num_nodes = int(lines[0].strip())
    graph = {}
    for line in lines[1:]:
        parts = [int(x.strip()) for x in line.split(',')]
        node = parts[0]
        edges = parts[1:]
        if node in graph:
            graph[node].extend(edges)
        else:
            graph[node] = edges
    return graph`;
      break;
    case "linkedlist":
      inputProcessingCode = `
def process_input(input_data):
    values = [int(x.strip()) for x in input_data.split(',')]
    head = None
    current = None
    for value in values:
        node = ListNode(value)
        if head is None:
            head = node
        else:
            current.next = node
        current = node
    return head`;
      break;
    default:
      inputProcessingCode = `
def process_input(input_data):
    return input_data`;
      break;
  }


  const outputProcessingCode = `
def process_output(output):
    return str(output)`;


  return `
${candidatePlaceholder}

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
  
${inputProcessingCode}
  
${outputProcessingCode}
  
import sys
def main():
    input_data = sys.stdin.read().strip()
    # [INPUT_TYPE] and [OUTPUT_TYPE] are placeholders replaced by backend parameters
    parsed_input = process_input(input_data)
    result = solve(parsed_input)  # 'solve' is the candidate's function
    print(process_output(result))

if __name__ == "__main__":
    main()
`;
}
