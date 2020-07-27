import java.util.*;

public class Main {
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        int N = scanner.nextInt();
        int K = scanner.nextInt();
        LinkedList<Integer> number = new LinkedList<>();
        int num = scanner.nextInt();

        for(int i = 0; i < N; i++) {
            number.addFirst(num % 10);
            num /= 10;
        }
        int remove = 0;
        while(K != 0)
        {
            for(Iterator<Integer> it = number.iterator(); it.hasNext() && K != 0;) {
                int next = it.next();
                if(next == remove + 1) break;
                if(next == remove) {
                    it.remove();
                    K--;
                }
            }
            remove = (remove+1) % 10;
        }

        for(Iterator<Integer> it = number.iterator(); it.hasNext();) {
            System.out.print(it.next());
        }
    }
}
